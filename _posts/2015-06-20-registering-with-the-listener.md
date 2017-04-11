---
layout: post
title: "Registering with the listener"
categories: journal
tags: [documentation,sample]
image:
  feature: black-earphones.jpg
  teaser: black-earphones-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---
When restarting a database, if you can't acess it from outside, you may have to associate the newly restarted database with the listener. The Pmon process that is started with the instance is responsible for registration of oracle server with listener.

Pmon process wakes up at every 60 seconds and provide information to the listener. If any problem arises and your Pmon process fails then it’s not possible to register information to listener periodically. In this case you can do *Manual service registration* using command:

``` SQL
ALTER SYSTEM REGISTER;
```

This command forces the registration of database information to the listener running on the server.