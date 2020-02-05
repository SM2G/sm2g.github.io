---
layout: post
title: "Extract tablespace DDL"
categories: database
tags: oracle
---

Should you need to perform a large data export and import on different Oracle databases, you'll need to make sure that the tablespace configuration matches your export and import parameters.

Whether you keep the same tablespace configuration, or should you decide to change it. Here's how to get the DDL necessary to check the structure or eventually create new tablespaces on the database where you'll perform the import operation.

```sql
set heading off
set echo off
Set pages 999
set long 90000

spool ddl_list.sql
select dbms_metadata.get_ddl('TABLESPACE',tb.tablespace_name) from dba_tablespaces tb;
spool off
```
