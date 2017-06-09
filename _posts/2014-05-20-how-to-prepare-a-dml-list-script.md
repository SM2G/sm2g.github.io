---
layout: post
title: "How to prepare a DML list script"
categories: journal
tags: [oracle, script]
image:
  feature: vintage-gun.jpg
  teaser: vintage-gun-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---

Sometimes, you need to execute a lot of DML instructions on a database.

This might look trivial but there are some very important elements to consider before running this kind of script on a production environment. Because depending on how many lines are you going to modify between commits, and the amount of queries that will run during the script, you can lock the table for a long time.

Here’s how to properly set-up a DML list script style.

``` SQL
spool my_logfile.log
alter session set cursor_sharing = force;
set time on timing on echo on autocommit 300;
update table set Column = 'value' where value_id =  4744595;
update table set Column = 'value' where value_id =  49062418;
update table set Column = 'value' where value_id =  51122934;
update table set Column = 'value' where value_id =  77119927;
[...]
commit;
spool off
```

The cursor_sharing option is there to prevent filling the shared pool with a lot of sql cursor and execution plans.
The autocommit parameter is a SQL*plus feature that allows you to commit every x number of DML instructions. Also, don't forget to add a final **Commit** statement.
Finally, I use spooling to save the output on a log file, so that if som DML statement had errors, I can correct it manually.
