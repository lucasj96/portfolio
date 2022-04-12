terraform {
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "1.46.0"
    }
  }
}

# TODO: split long line + add ports
resource "null_resource" "config_instance" {
  provisioner "local-exec" {
    command = "ansible-playbook --extra-vars 'app=${var.app} app_version=${var.app_version} kube_master_ip_address=${var.kube_master_ip_address} nfs_ip_address=${var.nfs_ip_address} green_app_ip_address=${var.green_app_ip_address} blue_app_ip_address=${var.blue_app_ip_address} ci_registry=${var.ci_registry} name=${var.name} username=${var.username} access_token=${var.access_token}' ${var.playbook} -vvv"
  }
}
