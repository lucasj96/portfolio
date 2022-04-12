#!/bin/bash

# Ref: https://kubernetes.io/docs/tasks/administer-cluster/namespaces-walkthrough/

kubectl config set-context blue --namespace=blue \
	--cluster=kubernetes \
  --user=kubernetes-admin

kubectl config set-context green --namespace=green \
  --cluster=kubernetes \
  --user=kubernetes-admin