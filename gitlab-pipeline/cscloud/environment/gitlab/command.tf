module "remote_config" {
  source               = "../modules/commands"
  fip_address          = openstack_compute_floatingip_associate_v2.gitlab_associate_fip.floating_ip
  ssh_private_key_path = var.ssh_private_key_path
  playbook             = "ansible-pb-runner.yml"
  depends_on = [
    time_sleep.wait
  ]
}

resource "time_sleep" "wait" {
  depends_on = [
    local_file.ansiblecfg,
    local_file.role_runner_main
  ]
  create_duration = "30s"
}
