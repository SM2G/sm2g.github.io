---
layout: post
title: "Extract tablespace DDL"
categories: journal
tags: oracle sql
image:
  feature: structure-hall.jpg
  teaser: structure-hall-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---
Here’s how to extract the sql commands to create any tablespace. Useful when creating a partial database copy. You can modify the query to only get a specific set of tablespaces you need.

``` SQL
set heading off
set echo off
set pages 999
set long 90000

spool ddl_tablespaces.sql

select dbms_metadata.get_ddl('TABLESPACE',tb.tablespace_name)
from dba_tablespaces tb;
-- Where tb.tablespace_name = 'MY_TABLESPACE';

spool off
```
