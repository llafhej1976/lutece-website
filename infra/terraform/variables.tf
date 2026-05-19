variable "tenancy_ocid" {
  type = string
}

variable "user_ocid" {
  type = string
}

variable "fingerprint" {
  type = string
}

variable "private_key_path" {
  type = string
}

variable "region" {
  type    = string
  default = "eu-paris-1"
}

variable "compartment_id" {
  type = string
}

variable "availability_domain" {
  type    = string
  default = "MCQj:EU-PARIS-1-AD-1"
}

variable "ubuntu_arm_image_id" {
  type        = string
  description = "OCI Ubuntu 22.04 ARM image OCID for eu-paris-1"
}

variable "ssh_public_key" {
  type = string
}
