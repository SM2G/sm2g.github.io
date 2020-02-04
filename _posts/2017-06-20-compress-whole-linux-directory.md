---
layout: post
title: "Compress a Whole Linux or UNIX Directory"
categories: system
tags: linux
image: blur-drops
---

Ok, that's a simple one, but it's always nice to have a quick syntax remainder.
So, here's the best way to compress a whole directory under Linux/UNIX using a shell prompt.

This technique is often used to backup files or to move data using a compressed archive. The GNU *tar* command is best for this work.
This command does two things for you:

+ Create the archive
+ Compress the archive

You need to use the *tar* command as follows:
```bash
tar -zcvf archive-name.tar.gz directory-name
```
With the arguments,

- **z**: To compress archive using gzip programrm
- **c**: Create archive
- **v**: Add verbose mode. i.e display progress while creating archive
- **f**: finally, the archive File name

For example, you have directory called **/home/sm2g/stuff** and you would like to compress this directory then you can type tar command as follows:
```bash
tar -zcvf backup-2017.tar.gz /home/sm2g/stuff
```

The above command will create an archive file called **backup-2017.tar.gz** in current directory.
Now, eventually you'll want to restore your archive. Just use following command (it will extract all files in current directory):
```bash
tar -zxvf backup-2017.tar.gz
```
With,

- **x**: To extract files

If you wish to extract files in particular directory, for example in /tmp then you need to use following command:
```bash
tar -zxvf backup-2017.tar.gz -C /tmp
cd /tmp
ls -lhart
```
