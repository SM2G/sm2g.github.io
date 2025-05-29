---
layout: post
title: "Permanently authenticating with Git repositories"
categories: devops
tags: AWS Docker
---

On Linux you can use the 'cache' authentication helper that is bundled with Git 1.7.9 and higher. From the Git documentation:

    This command caches credentials in memory for use by future git programs. The stored credentials never touch the disk, and are forgotten after a configurable timeout. The cache is accessible over a Unix domain socket,
    restricted to the current user by filesystem permissions.

Run the command below to enable credential caching. After enabling credential caching any time you enter your password it will be cached for 1 hour (3600 seconds):

<pre><code>
git config -l
git config --global credential.helper 'cache --timeout 10800'
</code></pre>