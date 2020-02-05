---
layout: post
title: "Using SCP with file compression"
categories: system
tags: mysql linux
---

The command-line tool SCP can be effectively used to move files and perform file compression in the transfer. However, there’s different ways to achieve this, with different results.

Here are a few axamples with different results:

### To copy & compress in a single line

```bash
gzip -c test_arch.arc | ssh user@new_serv "cat > /home/oracle/backup/backup.tgz"
# or
ssh new_serv "cat /tmp/backup.sql | gzip -c1" | gunzip -c > backup.sql
```

### Best Gzip compression & transfer

```bash
time gzip --fast -c /home/oracle/oradata/SID/FILE01.dbf | ssh -oCompression=no  oracle@new_serv  "gunzip -c > /home/oracle/FILE01.dat"
```

### SCP with online transfer compression

This solution achieves network compression only.

```bash
scp -C new_serv:/tmp/backup.sql /path/to/backup.sql

scp -C /home/oracle/oradata/SID/file01.dbf   \
       /home/oracle/oradata/SID/file02.dbf   \
       /home/oracle/oradata/SID/file03.dbf   oracle@new_serv:/path/to/.
```
