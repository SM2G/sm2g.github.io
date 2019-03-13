---
layout: post
title: "Resolve the ORA-01157 Error"
categories: journal
tags: oracle
image:
  feature: old-door.jpg
  teaser: old-door-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---
Another day at the office, I was investigating a performace issue when I encountered the following error:

``` SQL
Select count(*) from purchase.table where CREATION_DATE > SYSDATE - 40;

Execution Plan
----------------------------------------------------------
An uncaught error happened in fetching the records : ORA-01157: cannot identify/lock data file 2011 - see DBWR trace file
ORA-01110: data file 2011: '/oracle/oradata/SID/temp2_09.dbf'

ORA-01157: cannot identify/lock data file 2011 - see DBWR trace file
ORA-01110: data file 2011: '/oracle/oradata/SID/temp2_09.dbf'
```

That error is due to a corrupted segment inside a tempfile. To overcome this issue, you'll need to drop the corrupted tempfile and replace it, as it's just temporary data. However, we'll just rename it and keep *just in case*.

``` SQL
alter database tempfile  '/oracle/oradata/SID/temp2_09.dbf' drop;

Database altered.

! mv /oracle/oradata/SID/temp2_09.dbf /oracle/oradata/SID/temp2_09.bck

alter tablespace temp2 add tempfile '/oracle/oradata/SID/temp2_09.dbf' size 10M autoextend on;

Tablespace altered.

```

And now the data is accessible again.
