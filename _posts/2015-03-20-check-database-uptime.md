---
layout: post
title: "Check database uptime"
categories: database
tags: database oracle mysql
image: cockpit-sunset
---
Sometimes you have to check when a database was started for the last time.
To get the information, just log on to the database and use the following query to get the last startup time:

**On Oracle database**

```sql
SELECT to_char(startup_time,'DD-MON-YYYY HH24:MI:SS') AS "DB Startup Time"
FROM   sys.v_$instance;
```

**On Mysql database**

```sql
SHOW GLOBAL STATUS LIKE 'Uptime';
```

This simple trick can be useful to troubleshoot when a database was unavaliable at some point and is now accessible. Using this simple command you'll be able to tell if the database has been restarted.
