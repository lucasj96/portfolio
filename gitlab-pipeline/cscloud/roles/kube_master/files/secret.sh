#!/bin/bash

# Need to login first: docker login -u <username> -p <access_token> gitlab.lnu.se:5050
# Ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/ 

kubectl create secret generic regcred \
    --from-file=.dockerconfigjson=/home/ubuntu/.docker/config.json \
    --type=kubernetes.io/dockerconfigjson