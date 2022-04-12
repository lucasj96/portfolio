#!/bin/bash

APP=$1
VERSION=$2
NFS_IP_ADDRESS=$3
BLUE_ENV=$4
GREEN_ENV=$5

eval $(ssh-agent)

ansible-playbook \
  --extra-vars "app=${APP} app_version=${VERSION} nfs_ip_address=${NFS_IP_ADDRESS} blue_env=${BLUE_ENV} green_env=${GREEN_ENV}" \
  ansible-pb-deploy-update-blue.yml -vvv


