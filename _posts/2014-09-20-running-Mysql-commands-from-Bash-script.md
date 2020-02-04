---
layout: post
title: "Running Mysql commands from Bash script"
categories: journal
tags: mysql linux
image: command
---
Eventually, you’ll need to automate queries on your Mysql database, let’s say, for reporting purposes.
Hee’s how to put SQL queries into a shell script, and possibly including variables based on the date or whatever fits your needs:

```bash
$ cat execmysql.sh
#!/bin/sh
ids="3,4"
table="NMS.main"
qry="select id,data from $table where id in ($ids)"
echo "Executing the query..."
echo $qry
/usr/bin/mysql -u root << eof
$qry
eof
```

And the execution output:

```bash
$ ./execmysql.sh
Executing the query...
select id,data from NMS.main where id in (3,4)
id data
3 pizza
4 bash
```
