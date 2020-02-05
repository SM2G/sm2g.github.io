---
layout: post
title: "Moving MySQL datafiles"
categories: database
tags: mysql linux
image: mini-van
---

In this article, I’ll demonstrate multiple solutions to move datafiles

### Method 1: using symbolic links

Stop the Mysql instance.
```bash
/etc/init.d/mysql stop
```

Then move the files and put symbolic links to lure Mysql into thinking the files are still in place.
```bash
mkdir /new_dir/datafiles/my_db
cd /old_dir/datafiles/
cp -Rvp my_db/* /new_dir/datafiles/my_db/.
rm my_db/* && rmdir my_db/
ln -s /new_dir/datafiles/my_db/ my_db
```

### Method 2: changing the configuration file

Open your Mysql configuration file: /etc/mysql/my.cnf and look for the entry for “datadir”. Then, simply change the path (which should be “/var/lib/mysql”) to the new data directory.

This method also requires an instance restart.

```bash
sudo /etc/init.d/mysql restart
```
