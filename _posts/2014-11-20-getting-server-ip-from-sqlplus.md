---
layout: post
title: "Getting the server IP Address from SQL*plus"
categories: journal
tags: system network
image: spider-web
---
Here’s a small script to get the IP address of the host server directly from the SQL*plus command line.

```sql
DECLARE
v_host_name v$instance.host_name%type;
v_ip_address varchar2(50);
BEGIN
SELECT host_name INTO v_host_name FROM v$instance;
dbms_output.put_line('the database server name is ' || v_host_name);

SELECT UTL_INADDR.GET_HOST_ADDRESS(v_host_name) INTO v_ip_address FROM DUAL;
dbms_output.put_line('the database server ip address is ' || v_ip_address);
end;
/
```

You can use this PL/SQL block in a script for example.
Here's an output of the script:

```sql
the database server name is ASERVERNAME
the database server ip address is 10.1.1.71
```
