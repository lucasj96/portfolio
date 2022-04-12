module "blue_remote_config" {
  source                 = "../modules/commands"
  kube_master_ip_address = module.kube_master.ip_v4
  ssh_private_key_path   = var.ssh_private_key_path
  playbook               = "ansible-pb-kube-blue-node.yml"
  app_version            = var.app_version
  depends_on = [
    module.bastion_remote_config,
    module.kube_master_remote_config,
    module.nfs_remote_config,
    module.lb_config
  ]
}

module "green_remote_config" {
  source                 = "../modules/commands"
  kube_master_ip_address = module.kube_master.ip_v4
  ssh_private_key_path   = var.ssh_private_key_path
  playbook               = "ansible-pb-kube-green-node.yml"
  app_version            = var.app_version
  depends_on = [
    module.bastion_remote_config,
    module.kube_master_remote_config,
    module.nfs_remote_config,
    module.lb_config
  ]
}

module "kube_master_remote_config" {
  source               = "../modules/commands"
  ssh_private_key_path = var.ssh_private_key_path
  playbook             = "ansible-pb-kube-master.yml"
  app_version          = var.app_version
  username             = var.username
  access_token         = var.access_token
  ci_registry          = var.ci_registry
  depends_on = [
    module.bastion_remote_config
  ]
}

module "nfs_remote_config" {
  source               = "../modules/commands"
  ssh_private_key_path = var.ssh_private_key_path
  playbook             = "ansible-pb-nfs.yml"
  app                  = var.app
  app_version          = var.app_version
  username             = var.username
  access_token         = var.access_token
  ci_registry          = var.ci_registry
  depends_on = [
    module.bastion_remote_config
  ]
}

module "deploy_blue_env" {
  source               = "../modules/commands"
  nfs_ip_address       = module.nfs.ip_v4
  ssh_private_key_path = var.ssh_private_key_path
  playbook             = "ansible-pb-deploy-blue.yml"
  app_version          = var.app_version
  app                  = var.app
  username             = var.username
  access_token         = var.access_token
  ci_registry          = var.ci_registry
  depends_on = [
    module.blue_remote_config
  ]
}

module "deploy_green_env" {
  source               = "../modules/commands"
  nfs_ip_address       = module.nfs.ip_v4
  ssh_private_key_path = var.ssh_private_key_path
  playbook             = "ansible-pb-deploy-green.yml"
  app_version          = var.app_version
  app                  = var.app
  username             = var.username
  access_token         = var.access_token
  ci_registry          = var.ci_registry
  depends_on = [
    module.green_remote_config
  ]
}

module "bastion_remote_config" {
  source               = "../modules/commands"
  ssh_private_key_path = var.ssh_private_key_path
  playbook             = "ansible-pb-bastion.yml"
  depends_on = [
    time_sleep.wait
  ]
}

module "lb_config" {
  source               = "../modules/commands"
  ssh_private_key_path = var.ssh_private_key_path
  playbook             = "ansible-pb-lb.yml"
  app_version          = var.app_version
  name                 = var.name
  blue_app_ip_address  = module.blue_app.ip_v4
  green_app_ip_address = module.green_app.ip_v4

  depends_on = [
    time_sleep.wait
  ]
}

resource "time_sleep" "wait" {
  depends_on = [
    local_file.ansiblecfg
  ]
  create_duration = "30s"
}
