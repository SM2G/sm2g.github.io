---
layout: post
title: "Docker tips"
categories: journal
tags: [documentation,sample]
image:
  feature: space-container.jpg
  teaser: space-container-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---

Recently, I started working with Docker on various projects.
So here's just a bunch of commands I've found to be quite helpful while troubleshooting errors with Docker.

```$xslt
# List all containers
docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
project_web         latest              f4ef8d25add1        5 weeks ago         414MB
<none>              <none>              9134bb24f1c0        5 weeks ago         414MB
<none>              <none>              40fe35f4a3d4        5 weeks ago         413MB
<none>              <none>              3b0f34da4fb8        5 weeks ago         415MB
<none>              <none>              c0db2948ac36        5 weeks ago         341MB
<none>              <none>              6eb6441acb58        5 weeks ago         349MB
elixir              1.5.1-alpine        2e25543d4c8b        6 weeks ago         80.6MB
postgres            9.4                 f5a204444914        8 weeks ago         263MB
kamui/postgresql    latest              580b3438c359        3 years ago         387MB

# List all running Docker containers
CONTAINER ID     IMAGE            COMMAND                 CREATED          STATUS           PORTS                    NAMES
b43f7ef41d7f     hades_web        "/app/build.sh && ..."  3 hours ago      Up 3 hours       0.0.0.0:9999->4000/tcp   project_web_1
df54b187072b     postgres:9.4     "docker-entrypoint..."  3 hours ago      Up 3 hours       0.0.0.0:9998->5432/tcp   db

```

And when everything fails...

```$xslt
# Delete all containers
docker rm $(docker ps -a -q)

# Delete all images
docker rmi $(docker images -q)
```
## Privileged mode

You can also start a Docker container in `--privileged` mode to unlock some advanced options, such as creating new network interfaces for a VPN, for example. Here's how to check if a container is started in privileged mode:

```
docker inspect --format='{{.HostConfig.Privileged}}' 618d47113878
false
```

## Useful tips

* Tail logs from a running container

```
docker ps
docker logs -f [container_name]
```

 * To spawn a shell into a running container

```
docker ps
docker exec -it [container_name] /bin/bash
```
