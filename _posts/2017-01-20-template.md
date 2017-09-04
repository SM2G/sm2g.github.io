---
layout: post
title: "Image compression from the command line"
categories: journal
tags: [documentation,sample]
image:
  feature: camera-focus.jpg
  teaser: camera-focus-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---
Here's a small script to compress JPEG images in a folder.
Useful to save a few kilobytes of bandwith when serving images from your website.

I might improve this script in the future to include more compression tools and/or file extensions.

``` Bash
#!/bin/bash

for f in *.jpg *.JPG *.jpeg *.JPEG
do
    echo -en "Converting ${f} ... "
    kb_orig=`du -k "${f}" | cut -f1`
    convert -quality 70 ${f} ${f}
    kb_after=`du -k "${f}" | cut -f1`
    pct_gain=`expr ${kb_after} \* 100 / ${kb_after}`
    echo " (${kb_orig}kb ==> ${kb_after}kb) DONE - ${pct_gain}%."
done
```
