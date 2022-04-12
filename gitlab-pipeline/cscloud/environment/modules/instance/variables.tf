variable "name" {
  type = string
}

variable "openstack_keypair_name" {
  type = string
}

variable "secgroup_ids" {
  type = list(any)
}

variable "network_name" {
  type = string
}

variable "flavor_name" {
  type = string
}
