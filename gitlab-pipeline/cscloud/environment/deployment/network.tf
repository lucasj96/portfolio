module "deployment_network" {
  source      = "../modules/network"
  name        = "deployment"
  cidr        = "172.16.3.0/24"
  description = "Floating ip for deployment"
}

resource "openstack_networking_floatingip_v2" "lb_fip" {
  description = "LB fip"
  pool        = "public"
}

resource "openstack_networking_floatingip_v2" "bastion_fip" {
  description = "Bastion fip"
  pool        = "public"
}

resource "openstack_compute_floatingip_associate_v2" "lb_associate_fip" {
  floating_ip = openstack_networking_floatingip_v2.lb_fip.address
  instance_id = module.lb.instance_id
}

resource "openstack_compute_floatingip_associate_v2" "bastion_associate_fip" {
  floating_ip = openstack_networking_floatingip_v2.bastion_fip.address
  instance_id = module.bastion.instance_id
}

module "deployment_http" {
  source    = "../modules/sec-group"
  name      = "deployment_http"
  port_min  = 80
  port_max  = 80
  protocol  = "tcp"
  direction = "ingress"
}

module "deployment_https" {
  source    = "../modules/sec-group"
  name      = "deployment_https"
  port_min  = 443
  port_max  = 443
  protocol  = "tcp"
  direction = "ingress"
}

module "deployment_ssh" {
  source    = "../modules/sec-group"
  name      = "deployment_ssh"
  port_min  = 22
  port_max  = 22
  protocol  = "tcp"
  direction = "ingress"
}

module "jump_server_ssh" {
  source    = "../modules/sec-group"
  name      = "jump_server_ssh"
  port_min  = 22
  port_max  = 22
  protocol  = "tcp"
  direction = "egress"
}

module "deployment_blue_port" {
  source    = "../modules/sec-group"
  name      = "deployment_blue_port"
  port_min  = 31111
  port_max  = 31111
  protocol  = "tcp"
  direction = "ingress"
}

module "deployment_green_port" {
  source    = "../modules/sec-group"
  name      = "deployment_green_port"
  port_min  = 31112
  port_max  = 31112
  protocol  = "tcp"
  direction = "ingress"
}

data "openstack_networking_secgroup_v2" "default" {
  name = "default"
}
