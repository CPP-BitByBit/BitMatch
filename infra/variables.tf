variable "db_username" {
  description = "Postgres RDS Instance DB Username"
  type        = string
}

variable "db_password" {
  description = "Postgres RDS Instance DB Password"
  type        = string
  sensitive   = true
}