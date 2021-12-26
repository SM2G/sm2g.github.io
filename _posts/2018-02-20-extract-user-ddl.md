---
layout: post
title: "How to extract Oracle user DDL"
categories: database
tags: database oracle
---

In some cases, you need to duplicate an Oracle user, along with all it's privileges. Doing this manually can be tedious.
Hopefully, we can use the data dictionary to extract the data we need and dump it into a SQL file to modify and replay.

Here's how to do it:

```sql
set head off
set pages 0
set long 9999999
spool user_script.sql

SELECT DBMS_METADATA.GET_DDL('USER', '&&USERNAME') || '/' as DDL
FROM DBA_USERS
UNION
SELECT DBMS_METADATA.GET_GRANTED_DDL('ROLE_GRANT', '&USERNAME') || '/' as DDL
FROM DBA_USERS
UNION
SELECT DBMS_METADATA.GET_GRANTED_DDL('SYSTEM_GRANT', '&USERNAME') || '/' as DDL
FROM DBA_USERS
UNION
SELECT DBMS_METADATA.GET_GRANTED_DDL('OBJECT_GRANT', '&USERNAME') || '/' as DDL
FROM DBA_USERS;

spool off;

```

Now, if we were to do this for multiple users, I would suggest using a PL/SQL script to iterate over a list of users.
Like so:

```sql
DECLARE
 v_ddl_user VARCHAR2(3000);
 v_ddl_rol_grant VARCHAR2(3000);
 v_ddl_sys_grant VARCHAR2(3000);
 v_ddl_obj_grant VARCHAR2(3000);
 type usr_type is table of VARCHAR2(30);
 usr usr_type := usr_type ('USER_1', 'USER_2', 'USER_3');
 BEGIN
   FOR i IN 1..usr.count LOOP
     SELECT DBMS_METADATA.GET_DDL('USER',usr(i))||'/' INTO v_ddl_user FROM DBA_USERS;
     SELECT DBMS_METADATA.GET_GRANTED_DDL('ROLE_GRANT',usr(i))||'/' INTO v_ddl_rol_grant FROM DBA_USERS;
     SELECT DBMS_METADATA.GET_GRANTED_DDL('SYSTEM_GRANT',usr(i))||'/' INTO v_ddl_sys_grant FROM DBA_USERS;
     SELECT DBMS_METADATA.GET_GRANTED_DDL('OBJECT_GRANT',usr(i))||'/' INTO v_ddl_obj_grant FROM DBA_USERS;
     dbms_output.put_line(v_ddl_user);
     dbms_output.put_line(v_ddl_rol_grant);
     dbms_output.put_line(v_ddl_sys_grant);
     dbms_output.put_line(v_ddl_obj_grant);
    END LOOP;
 END;
/
```
