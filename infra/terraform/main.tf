terraform {
  required_providers {
    oci = {
      source  = "oracle/oci"
      version = "~> 6.0"
    }
  }
}

provider "oci" {
  tenancy_ocid     = var.tenancy_ocid
  user_ocid        = var.user_ocid
  fingerprint      = var.fingerprint
  private_key_path = var.private_key_path
  region           = var.region
}

resource "oci_core_vcn" "website_vcn" {
  compartment_id = var.compartment_id
  cidr_block     = "10.10.0.0/16"
  display_name   = "lutece-website-vcn"
  dns_label      = "lutecesite"
}

resource "oci_core_internet_gateway" "website_ig" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.website_vcn.id
  display_name   = "lutece-website-ig"
}

resource "oci_core_route_table" "website_rt" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.website_vcn.id
  display_name   = "lutece-website-rt"

  route_rules {
    destination       = "0.0.0.0/0"
    network_entity_id = oci_core_internet_gateway.website_ig.id
  }
}

resource "oci_core_security_list" "website_sl" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.website_vcn.id
  display_name   = "lutece-website-sl"

  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    tcp_options {
      min = 22
      max = 22
    }
  }

  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    tcp_options {
      min = 80
      max = 80
    }
  }

  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    tcp_options {
      min = 443
      max = 443
    }
  }

  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
  }
}

resource "oci_core_subnet" "website_subnet" {
  compartment_id    = var.compartment_id
  vcn_id            = oci_core_vcn.website_vcn.id
  cidr_block        = "10.10.1.0/24"
  display_name      = "lutece-website-public-subnet"
  dns_label         = "public"
  route_table_id    = oci_core_route_table.website_rt.id
  security_list_ids = [oci_core_security_list.website_sl.id]
}

resource "oci_core_instance" "website_vm" {
  compartment_id      = var.compartment_id
  availability_domain = var.availability_domain
  shape               = "VM.Standard.A1.Flex"

  shape_config {
    ocpus         = 2
    memory_in_gbs = 12
  }

  display_name = "lutece-website-vm"

  create_vnic_details {
    subnet_id        = oci_core_subnet.website_subnet.id
    assign_public_ip = true
    hostname_label   = "website"
  }

  source_details {
    source_type = "image"
    source_id   = var.ubuntu_arm_image_id
  }

  metadata = {
    ssh_authorized_keys = var.ssh_public_key
    user_data           = base64encode(file("${path.module}/cloud-init.sh"))
  }
}

output "website_public_ip" {
  value       = oci_core_instance.website_vm.public_ip
  description = "Public IP of the website VM — add to Cloudflare DNS A record"
}
