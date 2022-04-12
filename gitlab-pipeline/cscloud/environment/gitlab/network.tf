module "gitlab_network" {
  source      = "../modules/network"
  name        = "gitlab"
  cidr        = "172.16.2.0/24"
  description = "Floating ip for gitlab"
}

resource "openstack_networking_floatingip_v2" "gitlab_fip" {
  description = "Gitlab fip"
  pool        = "public"
}

resource "openstack_compute_floatingip_associate_v2" "gitlab_associate_fip" {
  floating_ip = openstack_networking_floatingip_v2.gitlab_fip.address
  instance_id = module.gitlab_instance.instance_id
}


module "gitlab_http" {
  source    = "../modules/sec-group"
  name      = "gitlab_http"
  port_min  = 80
  port_max  = 80
  protocol  = "tcp"
  direction = "ingress"
}

module "gitlab_ssh" {
  source    = "../modules/sec-group"
  name      = "gitlab_ssh"
  port_min  = 22
  port_max  = 22
  protocol  = "tcp"
  direction = "ingress"
}

data "openstack_networking_secgroup_v2" "default" {
  name = "default"
}
