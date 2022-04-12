output "lb_ip" {
  value       = openstack_networking_floatingip_v2.lb_fip.address
  description = ""
}

output "lb_private_ip" {
  value       = module.lb.ip_v4
  description = ""
}

output "blue_ip" {
  value       = module.blue_app.ip_v4
  description = ""
}

output "green_ip" {
  value       = module.green_app.ip_v4
  description = ""
}

output "nfs_ip" {
    value = module.nfs.ip_v4
    description = ""
}

output "kube_master_ip" {
    value = module.kube_master.ip_v4
    description = ""
}