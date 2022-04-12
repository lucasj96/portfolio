# Ansible ansible.cfg
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

# Not dynamically generated!
resource "local_file" "inventory" {
  content  = <<EOT
[nfs]
${module.nfs.ip_v4}

[blue_app]
${module.blue_app.ip_v4}

[green_app]
${module.green_app.ip_v4}

[kube_master]
${module.kube_master.ip_v4}

[bastion]
${openstack_networking_floatingip_v2.bastion_fip.address}

[lb]
${openstack_networking_floatingip_v2.lb_fip.address}

[nfs:vars] 
ansible_connection=ssh
ansible_user = ubuntu
ansible_port=22
ansible_ssh_common_args='-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ProxyCommand="ssh -W %h:%p -q -i ${var.ssh_private_key_path} ubuntu@${openstack_networking_floatingip_v2.bastion_fip.address}"'

[kube_master:vars] 
ansible_connection=ssh
ansible_user = ubuntu
ansible_port=22
ansible_ssh_common_args='-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ProxyCommand="ssh -W %h:%p -q -i ${var.ssh_private_key_path} ubuntu@${openstack_networking_floatingip_v2.bastion_fip.address}"'

[blue_app:vars] 
ansible_connection=ssh
ansible_user = ubuntu
ansible_port=22
ansible_ssh_common_args='-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ProxyCommand="ssh -W %h:%p -q -i ${var.ssh_private_key_path} ubuntu@${openstack_networking_floatingip_v2.bastion_fip.address}"'

[green_app:vars] 
ansible_connection=ssh
ansible_user = ubuntu
ansible_port=22
ansible_ssh_common_args='-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ProxyCommand="ssh -W %h:%p -q -i ${var.ssh_private_key_path} ubuntu@${openstack_networking_floatingip_v2.bastion_fip.address}"'
  EOT
  filename = "inventory"

  depends_on = [
    module.nfs,
    module.bastion,
    module.blue_app,
    module.green_app,
    module.kube_master,
    module.deployment_network,
    module.lb
  ]
}
