# Provider Block
provider "aws" {
  profile = "default"
  region = "us-west-1"
}

# Create a BITMATCH VPC
resource "aws_vpc" "bitmatch_vpc" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "BitMatchVPC"
  }
}

# Public Subnet (For EC2)
resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.bitmatch_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-west-1a"

  tags = {
    Name = "PublicSubnet"
  }
}

# Private Subnet (For RDS)
resource "aws_subnet" "private_subnet" {
  vpc_id            = aws_vpc.bitmatch_vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-west-1a"

  tags = {
    Name = "PrivateSubnet"
  }
}

resource "aws_subnet" "private_subnet_placeholder" {
  vpc_id            = aws_vpc.bitmatch_vpc.id
  cidr_block        = "10.0.3.0/24" 
  availability_zone = "us-west-1b"

  tags = {
    Name = "PrivateSubnetPlaceholder"
  }
}

# Internet Gateway (For EC2 internet access)
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.bitmatch_vpc.id

  tags = {
    Name = "InternetGateway"
  }
}

# Route Table for Public Subnet (Allows outbound internet access)
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.bitmatch_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  tags = {
    Name = "PublicRouteTable"
  }
}

# Associate Route Table with Public Subnet
resource "aws_route_table_association" "public_assoc" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

# Security Group for EC2
resource "aws_security_group" "ec2_sg" {
  vpc_id = aws_vpc.bitmatch_vpc.id
  name   = "ec2-security-group"

  # Allow SSH 
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow HTTP & HTTPS
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Security Group for RDS (Only allows EC2 connections)
resource "aws_security_group" "rds_sg" {
  vpc_id      = aws_vpc.bitmatch_vpc.id
  name        = "rds-security-group"
  description = "Security group for RDS PostgreSQL access"

  # Allow EC2 to connect to RDS
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2_sg.id]  # Only allow EC2
  }

  egress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2_sg.id]  # Only allow EC2
  }
}

# RDS Subnet Group (For private RDS)
resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "rds-subnet-group"
  subnet_ids = [aws_subnet.private_subnet.id, aws_subnet.private_subnet_placeholder.id]

  tags = {
    Name = "RDSSubnetGroup"
  }
}

# RDS (Postgres DB in Private Subnet)
resource "aws_db_instance" "default" {
  allocated_storage      = 20
  db_name                = "bitmatchdjangodb"
  engine                 = "postgres"
  engine_version         = "17.2"
  instance_class         = "db.t4g.micro"
  username              = var.db_username
  password              = var.db_password
  parameter_group_name  = "default.postgres17"
  skip_final_snapshot   = true
  publicly_accessible   = false  
  multi_az              = false
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
}

# EC2 (Django Server in Public Subnet)
resource "aws_instance" "django_server" {
  ami                    = "ami-01eb4eefd88522422"  # 2023 AMAZON LINUX AMI
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.public_subnet.id
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
  associate_public_ip_address = true

  tags = {
    Name = "DjangoBitMatchServer"
  }
}

# S3 Bucket for Django Images
resource "aws_s3_bucket" "django_media" {
  bucket = "bitmatch-django-media-bucket"

  tags = {
    Name = "DjangoMediaBucket"
  }
}

# Enable public read access
resource "aws_s3_bucket_policy" "public_access" {
  bucket = aws_s3_bucket.django_media.id
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::bitmatch-django-media-bucket",
        "arn:aws:s3:::bitmatch-django-media-bucket/*"
      ]
    }
  ]
}
POLICY
}

# Remove any public access blocks that could interfere
resource "aws_s3_bucket_public_access_block" "django_media_access" {
  bucket = aws_s3_bucket.django_media.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Create an IAM user for Django to interact with S3
resource "aws_iam_user" "django_s3_user" {
  name = "django-s3-user"
}

# Attach an IAM policy allowing access to the S3 bucket
resource "aws_iam_policy" "s3_access_policy" {
  name        = "DjangoS3AccessPolicy"
  description = "Policy for Django app to access S3"
  
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:HeadObject"
      ],
      "Resource": [
        "arn:aws:s3:::bitmatch-django-media-bucket",
        "arn:aws:s3:::bitmatch-django-media-bucket/*"
      ]
    }
  ]
}
POLICY
}

# Attach the IAM policy to the IAM user
resource "aws_iam_user_policy_attachment" "attach_s3_policy" {
  user       = aws_iam_user.django_s3_user.name
  policy_arn = aws_iam_policy.s3_access_policy.arn
}

# Generate IAM access keys for the IAM user
resource "aws_iam_access_key" "django_s3_user_key" {
  user = aws_iam_user.django_s3_user.name
}


####### FRONTEND RESOURCES
# TODO: PROVISION S3 WITH DEPLOY, CLOUDFRONT, ROUTE 53