variable "name" {
  type = string
}

variable "port_min" {
 type = number 
}

variable "port_max" {
  type = number
}

variable "protocol" {
  type = string
  default = "tcp"
}

variable "cidr" {
  type = string
  default = "0.0.0.0"
}

variable "direction" {
  type = string
}
