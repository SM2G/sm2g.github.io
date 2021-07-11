---
layout: post
title: "Convert FLAC to mp3 like a hacker"
categories: development
tags: system linux
---

So you need to convert a bonch of FLAC files to mp3 and your best search engine only recommands you online file converters that nobody trusts ore require a paid subscription to work.

Don't worry, *there's always a way*, and even better, a true ***hacker style*** way to achieve this!

This procedure works for MacOS through Brew, but you should be able to make it work on any Debian, Ubuntu or Linux system as well.

### Install

Using your favourite MacOS packet manager [Brew](https://brew.sh), install the Lame and FLAC libraries.

```bash
brew install lame flac
```

### Usage

Then, to convert a bunch of FLAC files in a directory, simply use the following loop.

```bash
for f in *.flac; do flac -cd "$f" | lame -b 320 - "${f%.*}".mp3; done
```
