#!/bin/bash

GREEN_IP=$1
BLUE_IP=$2
KUBE_MASTER_IP=$3
LB_IP=$4
PRODUCTION_ENV=$5
NAME=$6
APP=$7
VERSION=$8

eval $(ssh-agent)

ansible-playbook \
  --extra-vars "green_app_ip_address=${GREEN_IP} blue_app_ip_address=${BLUE_IP} kube_master_ip_address=${KUBE_MASTER_IP} lb_ip_address=${LB_IP} production_env=${PRODUCTION_ENV} name=${NAME} app=${APP} app_version=${VERSION}"\
  ansible-pb-blue-green-switch.yml -vvv


