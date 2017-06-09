---
layout: post
title: "ORA-01666 When Activating a Physical Standby Database"
categories: journal
tags: [oracle, standby]
image:
  feature: archive-room.jpg
  teaser: archive-room-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---
You're waking up a Physical standby database, and are welcomed by the following ORA-Code:

``` SQL
ORA-01666: controlfile is for a standby database
```

Don't panick, that's just because the database has been configured as a Standby one. Therefore, you can only open it as a Standby database. Simply start if with the following commands :

``` SQL
sqlplus / as sysdba
startup nomount;
alter database mount standby database;
```

The database will then open, and you'll be able to pursue any operation you were doing, Like starting an automatic recovery session, fixing a gap on redo log sequences, etc.
