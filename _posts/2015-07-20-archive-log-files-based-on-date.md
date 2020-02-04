---
layout: post
title: "Archive log files based on date"
categories: journal
tags: linux
image: clean-water
---
Here's some piece of code to use on a cron job when you have a software component (database or application) that spits out logs and you want to archive or delete those files based on creation date.

```bash
#Archive
find log/ -type f -mtime +681 -ls -exec mv {} log/2011/. \;

#Delete
find . -type f -mtime +30 -ls -exec rm {} \;
```
