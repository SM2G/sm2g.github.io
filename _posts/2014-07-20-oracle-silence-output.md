---
layout: post
title: "Oracle sqlplus silence output"
categories: journal
tags: oracle sqlplus database
image:
  feature: valve.jpg
  teaser: valve-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---

Use the following code on your scheduled Oracle scripts to silence terminal output except your data.

```sql
SET autocommit off;
SET echo       off;
SET feedback   off;
SET head       off;
SET heading    off;
SET linesize   0;
SET newpage    none;
SET newpage    none;
SET pagesize   0;
SET sqlprompt  '';
SET sqlnumber  off;
SET sqlbl      off;
SET trimspool  on;
SET verify     off;
SET TRIMSPOOL  on;
SET underline  off;

spool test.csv

select type_code||', '|| identifier from  my_table;

spool off

exit
```
