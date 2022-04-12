variable "openstack_keypair_name" {
  type = string
}

variable "ssh_private_key_path" {
  type = string
}

variable "app" {
  type    = string
  default = "dokuwiki"
}

variable "app_version" {
  type    = string
  default = "0.0.1"
}

variable "ci_registry" {
  type    = string
  default = "gitlab.lnu.se:5050"
}

variable "username" {
  type    = string
  default = "xxx"
}

variable "access_token" {
  type    = string
  default = "xxx"
}

variable "name" {
  type    = string
  default = "xxx"
}

