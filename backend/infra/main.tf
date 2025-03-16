# Provider Block
provider "aws" {
  profile = "default"
  region = "us-west-1"
}

# Security Group for RDS (allows inbound PostgreSQL connection from anywhere)
resource "aws_security_group" "rds_sg" {
  name        = "rds-security-group"
  description = "Security group for RDS PostgreSQL access"
  vpc_id      = "vpc-0d1c3a28194976c4c"  

  # Allow inbound connections on port 5432 from anywhere (0.0.0.0/0)
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow all IP addresses (for testing purposes)
  }

  # Allow all outbound traffic (default setting)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# RDS (Postgres DB)
resource "aws_db_instance" "default" {
  allocated_storage    = 20 # FREE TIER: 20 MAX              
  db_name              = "bitmatchdjangodb"
  engine               = "postgres"
  engine_version       = "17.2"           
  instance_class       = "db.t4g.micro" # FREE TIER: db.t3.micro, db.t4g.micro, or db.t3.micro
  username             = var.db_username   
  password             = var.db_password   
  parameter_group_name = "default.postgres17"
  skip_final_snapshot  = true            
  publicly_accessible  = true             
  storage_type         = "gp2"             
  multi_az             = false             
  backup_retention_period = 1           

  # Associate the custom security group with the RDS instance
  vpc_security_group_ids = [aws_security_group.rds_sg.id] 
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

# Output the IAM access key and secret 
# TODO: SECURELY STORE THIS
output "aws_access_key_id" {
  value     = aws_iam_access_key.django_s3_user_key.id
  sensitive = true
}

output "aws_secret_access_key" {
  value     = aws_iam_access_key.django_s3_user_key.secret
  sensitive = true
}