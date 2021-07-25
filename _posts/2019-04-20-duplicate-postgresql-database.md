---
layout: post
title: "How to duplicate a Postgresql database"
categories: database
tags: database postgresql
---

If you need to duplicate an existing Postgresql database, and possibly transfer ownership of the database objects to a new user, here's how to do that in a quick way:

```sql
-- First, I recommand getting the size of the database to copy, as this might be important for the rest of the process.
SELECT pg_database.datname,pg_size_pretty(pg_database_size(pg_database.datname)) AS size
FROM pg_database;

-- Create the new database. This might take some time depending on the size of the database.
CREATE DATABASE my_new_database TEMPLATE my_old_database;

-- Then, change the owner of the newly created database.
ALTER DATABASE my_new_database OWNER TO new_dbuser;
```

### Troubleshooting

You may get the following error

*ERROR: source database "originaldb" is being accessed by other users*

This means you must disconnect all other users from the database in order to do a clean copy.
Use this query:

```sql
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'originaldb'
AND pid <> pg_backend_pid();
```
