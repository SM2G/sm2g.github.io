---
layout: post
title: "Permanently authenticating with Git repositories"
categories: devops
tags: AWS Docker
---


https://confluence.atlassian.com/bitbucketserver/permanently-authenticating-with-git-repositories-776639846.html

<pre><code>
git config -l
git config --global credential.helper 'cache --timeout 10800'
</code></pre>