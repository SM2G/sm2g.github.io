---
layout: post
title: "Transfer multiple files simultaneously using SCP"
categories: journal
tags: linux
image:
  feature: cable-car.jpg
  teaser: cable-car-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---
I have been using the **Secure Copy** (scp) utility for copying files between my local server and development server. Sometimes I have to copy more than one file. Copying each file can be very annoying, as you have to type the password every time you use the command. But it is possible to copy multiple files using scp, just like the copy (cp) utility.

When you have to copy multiple files to your remote server, the syntax is similar to the cp command.

```
scp file1.sql file2.sh user@server:~/upload
```

Where *file1.sql* and *file2.sh* are the files to be copied, user is the username, server is the hostname and *~/upload* is the destination directory on the remote server.

In order to download multiple files from the remote server, the command to be used is:

```
scp user@server:"file1.log file2.log" ~/logs
```

Where *file1.log* and *file2.log* are the files to be downloaded and *~/logs* is the destination directory on the local server. Notice the quotes around the filenames. This ensures that the filenames list is not parsed by the local shell and is passed to the remote shell. Similarly, when you want to download files using wildcards (\*.php, files_?.log etc), you should enclose the name within quotes to ensure that the expansion is done by the remote server.

The -r option can be used to copy directories recursively.

```
scp -r user@server:~/logs ~/logs
```

This may not be a lifesaver tip but having the right command syntax is always helpful.
