---
layout: post
title: "INNODB table rebuild"
categories: journal
tags: [documentation,sample]
image:
  feature: dark-crane.jpg
  teaser: dark-crane-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---

### PROBLEM

On a **MySQL 5.6** database server, the *ibdata1* file includes 5 InnoDB tables in the mysql schema.

``` SQL
mysql> select table_name from information_schema.tables
    -> where table_schema='mysql' and engine='InnoDB';
+----------------------+
| table_name           |
+----------------------+
| innodb_index_stats   |
| innodb_table_stats   |
| slave_master_info    |
| slave_relay_log_info |
| slave_worker_info    |
+----------------------+
5 rows in set (0.00 sec)
```

In MySQL versions before 5.6, if you shutdown MySQL, delete *ibdata1*, and start MySQL back up, the *ibdata1* gets re-created. However, if you do this with MySQL 5.6, these 5 tables are not recreated. But even if your deleted *ibdata1*, the following 10 files are still in /var/lib/mysql/mysql:

* innodb_index_stats.frm

* innodb_index_stats.ibd

* innodb_table_stats.frm

* innodb_table_stats.ibd

* slave_master_info.frm

* slave_master_info.ibd

* slave_relay_log_info.frm

* slave_relay_log_info.ibd

* slave_worker_info.frm

* slave_worker_info.ibd

I learned this early on. With a newly created or damaged *ibdata1*, there are no corresponding data dictionary entries for those 5 tables, but the files are still there.
In this particular case, I copied *ibdata1* from a one server to another one.

### SOLUTION

1. Install MySQL on another server or find another Mysql DB engine installed.

2. Use mysqldump to extract only those 5 tables.

``` SQL
TABLELIST="innodb_index_stats"
TABLELIST="${TABLELIST} innodb_table_stats"
TABLELIST="${TABLELIST} slave_master_info"
TABLELIST="${TABLELIST} slave_relay_log_info"
TABLELIST="${TABLELIST} slave_worker_info"
mysqldump -uroot -p mysql ${TABLELIST} > mysql_innodb_tables.sql
```

3. Copy mysql_innodb_tables.sql to the original DB Server with the corrupted tables.

4. Execute mysql_innodb_tables.sql to create the missing tables.

5. Run FLUSH TABLES; *Optional*
