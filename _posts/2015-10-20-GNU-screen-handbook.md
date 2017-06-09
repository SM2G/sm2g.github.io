---
layout: post
title: "GNU Screen Handbook"
categories: journal
tags: [linux]
image:
  feature: linux-screen.jpg
  teaser: linux-screen-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---

GNU Screen is a very useful tool to run a long script on a server and make sure the script will run even if your computer gets disconnected, runs out of battery or whatever.

In this article, I'll assume you're already familiar with the basic concepts of GNU screen, and I'll just provide you with some tips that I use to make this tool even more convenient.

* Renaming a GNU screen session

1. Attach to the session in question.
2. Ctrl + a
3. Type "**:sessionname mySessionName**" - yes, the first colon is needed there, no extra spaces.
4. Type Enter.

* Listing GNU screen sessions

``` Bash
screen -l
```
* Kill a GNU screen session

Once the job is done, you can kill the session, either by attaching to it and then exiting the terminal, or directly by killing the session without having to connect to it first, like so:

``` Bash
screen -X -S [session_id] kill
```
