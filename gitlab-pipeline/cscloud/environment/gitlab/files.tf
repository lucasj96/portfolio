resource "local_file" "role_runner_main" {
  content  = <<EOT
reg_token: ${var.reg_token}
gitlab_domain: https://gitlab.lnu.se/
gitlab_token: ${var.gitlab_token}
description_docker_runner: ${var.name}-docker-runner
description_shell_runner: ${var.name}-shell-runner
tags_shell_runner: ${var.name} shell
tags_docker_runner: ${var.name} docker
gitlab_runner: gitlab-runner
sec_files:
  - ${var.ssh_private_key_path}
  - ${var.clouds_private_path}
  - ../../../environment/deployment/terraform.tfvars
bash_logout_files:
  - /home/gitlab-runner/.bash_logout
  - /home/ubuntu/.bash_logout
  EOT
  filename = "../../roles/runner/vars/main.yml"

  depends_on = [
    local_file.inventory
  ]
}

# Create ansible.cfg that is used locally by ansible
resource "local_file" "ansiblecfg" {
  content  = <<EOT
[defaults]
inventory = inventory
remote_user = ubuntu
host_key_checking = False
private_key_file = ${var.ssh_private_key_path}
roles_path = ../../roles
  EOT
  filename = "ansible.cfg"

  depends_on = [
    local_file.inventory
  ]
}

resource "local_file" "inventory" {
  content  = <<EOT
[gitlab_runner]
${openstack_networking_floatingip_v2.gitlab_fip.address}
  EOT
  filename = "inventory"

  depends_on = [
    module.gitlab_instance,
    module.gitlab_network
  ]
}