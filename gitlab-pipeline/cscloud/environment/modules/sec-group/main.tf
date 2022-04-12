terraform {
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "1.46.0"
    }
  }
}

resource "openstack_networking_secgroup_v2" "secgroup" {
  name = var.name
}

resource "openstack_networking_secgroup_rule_v2" "rule" {
  port_range_min    = var.port_min
  port_range_max    = var.port_max
  protocol          = var.protocol
  direction         = var.direction
  security_group_id = openstack_networking_secgroup_v2.secgroup.id
  ethertype         = "IPv4"
}
