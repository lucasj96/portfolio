variable "ssh_private_key_path" {
  type = string
}

variable "fip_address" {
  type    = string
  default = ""
}

variable "playbook" {
  type = string
}

variable "app" {
  type    = string
  default = "dokuwiki"
}

variable "app_version" {
  type = string
  default = "0.0.1"
}

variable "kube_master_ip_address" {
  type = string
  default = ""
}

variable "nfs_ip_address" {
  type = string
  default = ""
}

variable "ci_registry" {
  type = string
  default = "gitlab.lnu.se:5050"
}

variable "username" {
  type = string
  default = "xxx"
}

variable "access_token" {
  type = string
  default = "xxx"
}

variable "name" {
  type    = string
  default = "xxx"
}

variable "blue_app_ip_address" {
  type    = string
  default = "1.1.1.1"
}

variable "green_app_ip_address" {
  type    = string
  default = "1.1.1.2"
}