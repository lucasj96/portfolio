module "lb" {
  source                 = "../modules/instance"
  name                   = "lb"
  openstack_keypair_name = var.openstack_keypair_name
  network_name           = module.deployment_network.network_name
  flavor_name            = "c2-r4-d10"

  secgroup_ids = [
    data.openstack_networking_secgroup_v2.default.id,
    module.deployment_http.id,
    module.deployment_https.id,
    module.deployment_ssh.id
  ]
}

module "blue_app" {
  source                 = "../modules/instance"
  name                   = "blue_app"
  openstack_keypair_name = var.openstack_keypair_name
  network_name           = module.deployment_network.network_name
  flavor_name            = "c2-r4-d10"

  secgroup_ids = [
    data.openstack_networking_secgroup_v2.default.id,
    module.deployment_http.id,
    module.deployment_https.id,
    module.deployment_ssh.id,
    module.deployment_blue_port.id
  ]
}

module "green_app" {
  source                 = "../modules/instance"
  name                   = "green_app"
  openstack_keypair_name = var.openstack_keypair_name
  network_name           = module.deployment_network.network_name
  flavor_name            = "c2-r4-d10"

  secgroup_ids = [
    data.openstack_networking_secgroup_v2.default.id,
    module.deployment_http.id,
    module.deployment_https.id,
    module.deployment_ssh.id,
    module.deployment_green_port.id
  ]
}

module "kube_master" {
  source                 = "../modules/instance"
  name                   = "kube_master"
  openstack_keypair_name = var.openstack_keypair_name
  network_name           = module.deployment_network.network_name
  flavor_name            = "c2-r4-d20"

  secgroup_ids = [
    data.openstack_networking_secgroup_v2.default.id,
    module.deployment_http.id,
    module.deployment_https.id,
    module.deployment_ssh.id
  ]
}

module "nfs" {
  source                 = "../modules/instance"
  name                   = "nfs"
  openstack_keypair_name = var.openstack_keypair_name
  network_name           = module.deployment_network.network_name
  flavor_name            = "c2-r2-d40"
  secgroup_ids = [
    data.openstack_networking_secgroup_v2.default.id,
    module.deployment_ssh.id
  ]
}

module "bastion" {
  source                 = "../modules/instance"
  name                   = "bastion"
  openstack_keypair_name = var.openstack_keypair_name
  network_name           = module.deployment_network.network_name
  flavor_name            = "c1-r1-d10"
  secgroup_ids = [
    data.openstack_networking_secgroup_v2.default.id,
    module.deployment_ssh.id,
    module.jump_server_ssh.id
  ]
}
