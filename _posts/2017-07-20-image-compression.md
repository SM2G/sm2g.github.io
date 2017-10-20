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

To generate highly compressed **thumbnails**.
``` Bash
#!/bin/bash

# Thumbnail generator

MEDIA_DIR="/path"

cd ${MEDIA_DIR}

# CONVERT
for f in ${MEDIA_DIR}/*
do
    complete_filename=$(basename "$f")
    extension="${f##*.}"
    full_filename="${f%.*}"
    #echo $complete_filename $full_filename $extension
    echo -ne "Converting ${complete_filename} ... "
    kb_orig=`du -k "${f}" | cut -f1`
    convert -define peg:size=500x500 ${f} \
        -auto-orient -thumbnail 500x500 -unsharp 0x.5 ${full_filename}_thumb.gif
    kb_after=`du -k "${full_filename}_thumb.gif" | cut -f1`
    pct_gain=`expr 100 - ${kb_after} \* 100 / ${kb_orig}`
    echo -e "(${kb_orig}kb ==> ${kb_after}kb) \033[96m${pct_gain}\033[39m%."
done
```

