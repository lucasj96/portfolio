terraform {
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "1.46.0"
    }
  }
}

resource "openstack_networking_network_v2" "net" {
  name           = "net_${var.name}"
  admin_state_up = "true"
}

resource "openstack_networking_subnet_v2" "subnet" {
  network_id = openstack_networking_network_v2.net.id
  cidr       = var.cidr
}

resource "openstack_networking_router_v2" "router" {
  name                = "router_${var.name}"
  admin_state_up      = true
  external_network_id = "fd401e50-9484-4883-9672-a2814089528c"
}

resource "openstack_networking_router_interface_v2" "router_interface" {
  router_id = openstack_networking_router_v2.router.id
  subnet_id = openstack_networking_subnet_v2.subnet.id
}
