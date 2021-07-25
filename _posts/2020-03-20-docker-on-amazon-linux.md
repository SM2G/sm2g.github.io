---
layout: post
title: "Install Docker and docker-compose on Amazon Linux"
categories: devops
tags: AWS Docker
---

I often have to deploy an AWS instance running on Amazon Linux and using it to deploy Docker containers.

As *Amazon Linux* don't come with Docker preinstalled, you have to do it manually. Or even better, through a script in the ***user-data*** section of your launch template.

Here's the script you'll need to install the latest version of **Docker** and **docker-compose**.

```bash
# Install docker
sudo yum install docker
sudo usermod -aG docker ec2-user

# Install docker-compose
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose

# Verify install
docker --version
docker-compose version
```
