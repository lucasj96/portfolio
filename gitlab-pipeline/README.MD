# Gitlab CI/CD Pipeline

This was a group project that was part of an assignment with 4 group members that worked together to achieve this final result. The objective was to create a Continious Deployment pipeline with zero-downtime.
Worth mentioning is that the project was configured to work with multiple Runners associated with each users CScloud (Linnaeus Universities IaaS) account which is why certain configuration must be done.

This was achieved using Ansible, Terraform, Kubernetes, Gitlab CI, Bash scripts, to make a pipeline for the opensource application Dokuwiki

Certain files have been deleted/modified for group members privacy and for security reasons.

# Setup

## File structure for dokuwiki

https://www.dokuwiki.org/devel:dirlayout

## Githooks
Setup your hooks path to use thheproject githooks with:

    git config --local core.hooksPath hooks/yourname/

If the pre-commit hook does not seem to be working you can run it manually with 
   
    bash hooks/yourname/pre-commit

And then commit as usual.

## Initial setup
- Download your personal `openrc.sh` file from cscloud and run `source openrc.sh`
- Create a `terraform.tfvars` file and place it inside the `cscloud/environment` directory, use the `terraform.tfvars.sample` as a reference

## Gitlab runner setup
First edit the ansible variable that will be used to configure the runner
- Go to `cscloud/roles/runner/vars/main.yml.example` and use it as a reference when creating a `main.yml` file in the same directory
- Download your `clouds.yaml` file from cscloud and add password to it, eg. `password: "MyPassword"`. Place this file in ~/.config/openstack/clouds.yaml

Then setup your runner, go to the gitlab directory and run.
- `terraform init`
- `terraform apply -var-file="./../terraform.tfvars`

## Production/Staging
Production and staging will be executed by the runner from the `.gitlab-ci.yml` file.


## Commands

- terraform apply -var-file="./../terraform.tfvars"

- OS_DEBUG=1 TF_LOG=DEBUG terraform apply -parallelism=1

- tar -czf ```<file_name>```.tar.gz ```<file_name>```

- terraform apply -parallelism=3 # deafult is 10 concurrent operations

- OS_DEBUG=1 TF_LOG=DEBUG terraform apply -parallelism=1 -var-file="./../terraform.tfvars"

- kubectl exec --stdin --tty ```<pod_name>``` -- /bin/bash

- kubectl config use-context ```<context_name>```

- kubectl config get-contexts

- kubectl get nodes --show-labels

- kubectl get secret regcred --output="jsonpath={.data.\.dockerconfigjson}" | base64 --decode

-  
