module "gitlab_instance" {
  source                 = "../modules/instance"
  name                   = "runner"
  openstack_keypair_name = var.openstack_keypair_name
  network_name           = module.gitlab_network.network_name
  flavor_name            = "c2-r4-d40"

  secgroup_ids = [
    data.openstack_networking_secgroup_v2.default.id,
    module.gitlab_http.id,
    module.gitlab_ssh.id
  ]
}
