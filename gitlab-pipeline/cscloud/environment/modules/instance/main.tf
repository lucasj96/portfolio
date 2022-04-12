terraform {
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "1.46.0"
    }
  }
}

resource "openstack_compute_instance_v2" "instance" {
  name              = var.name
  image_name        = "Ubuntu server 20.04"
  flavor_name       = var.flavor_name
  key_pair          = var.openstack_keypair_name
  availability_zone = "Education"
  security_groups   = var.secgroup_ids

  network {
    name = var.network_name
  }
}
