---
layout: post
title: "Change the default temporary tablespace"
categories: journal
tags: oracle sql
image:
  feature: stainless-clock.jpg
  teaser: stainless-clock-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---
When your temporary tablespace gets full and you can't resize it, you may consider switching ti a new ont to reclaim disk space. Changing the default temporary tablespace will allows you to discard the old one entirely, and reduce the total database size.
In the following example, **Temp1** is the current temporary tablespace, that we want to switch for the **Temp2** tablespace.
Here’s how to create the second temporary tablespace and perform the switch:

``` SQL
Create temporary teblespace Temp2 tempfile '/path/to/temp201.dbf'
size 10M autoextend on next 1M;

Alter database default temporary tablespace TEMP2;
```

This will change the new default temporary tablespace for the database to Temp2. For the users who have already been explicitly assigned the tablespcae Temp1 , you would need to change that using the following command:

``` SQL
Select 'alter user '||USERNAME||' default temporary tablespace Temp2;'
From dba_users where temporary_tablespace = 'TEMP1';
```

Also, you can check which temporary tablespace is the default one by checking the database_properties dictionary view:

``` SQL
select property_name, property_value
from database_properties
where property_name like '%TEMP%';

 PROPERTY_NAME            PROPERTY_VALUE
 ------------------------ --------------------------------
DEFAULT_TEMP_TABLESPACE   TEMP2
```

So now, we can completely discard the old tablespace.
