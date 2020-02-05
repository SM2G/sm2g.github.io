---
layout: post
title: "Restart a hung Oracle database"
categories: database
tags: oracle
---

On rare occasions, mostly during a high server load peak or a process failure, an Oracle instance may not accept any connection. Either from regular users as well as SYSDBA.
This situation is called a **hung database** and must be quickly resolved as the database isn't accessible for your users anymore.
As you cannot connect to the hung database, you have to act quickly to recover. Basically, you have two choices here. Either wait (impacting the end users) or immediately bounce the instance.
If you're in an emergency situation, impacting a production environment, you'll have to restart the service using on of the two methods:

- Killing the background processes at the OS level, clearing RAM components and restart the instance.

- Force connect to the hung instance using Using *SQL*Plus* and the -prelim option to bypass creation of a new *SQL*Plus* session.

The *-prelim* option of the *SQL*Plus* connect string was introduced in 10g to bypasses the creation of a new session in cases where the database is hung and do not accept new connections.

```sql
sqlplus /nolog
set _prelim on
conn / as sysdba

Prelim connection established

shutdown abort -- The instance is dead anyway...

startup
```
