#!/bin/bash

app=$1
app_version=$2 
kube_master_ip_address=$3
nfs_ip_address=$4
green_app_ip_address=$5
blue_app_ip_address=$6
ci_registry=$7
name=$8
username=$9
access_token=${10}
playbook=${11}

ansible-playbook \
--extra-vars "app=${app} \n
app_version=${app_version} \n
kube_master_ip_address=${kube_master_ip_address} \n
nfs_ip_address=${nfs_ip_address} \n
green_app_ip_address=${green_app_ip_address} \n
blue_app_ip_address=${var.blue_app_ip_address} \n
ci_registry=${ci_registry} \n
name=${name} \n
username=${username} \n
access_token=${access_token}" \
${playbook} -vvv