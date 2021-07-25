---
layout: post
title: "Rename a Postgresql database"
categories: database
tags: database postgresql
---

Here's the procedure to rename a PostgreSQL database:

1. Disconnect from the database that you want to rename and connect to a different database.
2. Check and terminate all active connections to the database that you want to rename.
3. Use the `ALTER DATABASE` statement to rename the database to the new one.

Let’s take a look at an example of renaming a database. We start by creating a database called **old_db**:

```sql
CREATE DATABASE old_db;
```

Then we'll rename the **old_db** database to **new_db** following these steps:

First, disconnect from the database that you want to rename and connect to another database e.g., postgres.
And ensure there's no active connections to the target database to rename

```sql
\c postgres

-- Connect to the postgres database, so you are disconnected from the old_db database.
-- Next, check the all active connections to the old_db database by using the following query:

SELECT *
FROM pg_stat_activity
WHERE datname = 'old_db';
```

If the database you want to rename has many active connections, inform the respective users as well as the application owners before terminating the connections to avoid data loss.

If necessary, terminate all the remaining connections to the **old_db** database by using the following statement:

```sql
SELECT pg_terminate_backend (pid)
FROM pg_stat_activity
WHERE datname = 'db';
```

After that, rename the **old_db** database to **new_db** using the `ALTER DATABASE RENAME TO` statement as follows:

```sql
ALTER DATABASE db RENAME TO newdb;
```
