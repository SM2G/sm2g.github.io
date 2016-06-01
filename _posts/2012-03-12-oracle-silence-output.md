---
title: Sqlplus silence output
layout: post
category: aaa
tags: [oracle, sqlplus, database]
---
Use the following code on your scheduled Oracle scripts to silence terminal output except your data.

~~~SQL
set echo off
set feedback off
set linesize 100
set pagesize 0
set sqlprompt ''
set trimspool on
spool test.csv

select usr_type_code||','|| identifier from  td_usr_type_code;
spool off
exit
/
~~~
