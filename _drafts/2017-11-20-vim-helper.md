---
layout: post
title: "Vim helper"
categories: journal
tags: [documentation,sample]
image:
  feature: IMAGE.jpg
  teaser: IMAGE-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---

Removes empty lines or lines with only spaces
```
:%s/^[\ \t]*\n//g
```

Add ; at the end of each lines
```
:%s/\n/;\r/g
```

if you don't mind a little perl in your vim, you can use
```
:%! perl -pne '$random=int(rand 1000); s/XYZ/$random/'
```
