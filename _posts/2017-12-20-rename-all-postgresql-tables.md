---
layout: post
title: "Rename all tables in a Postgresql schema"
categories: database
tags: database postgresql
---

After a conversion usually done through AWS Database Migration Service, you may have a Postgresql database converted with table names in uppercase. These tables needs renaming, because you can't access it unless you specify the table name between quotes, like so.

```sql
Select count(*) from schema."MY_TABLE_NAME";
```

Otherwise the table are not found, because all identifiers, including column name are Case-Sensitive in PostgreSQL. To overcome this, you'll need to rename all the tables of the converted schema.
Here's how to generate the ALTER script to rename all tables into lower case letters.

```sql
SELECT 'ALTER TABLE "'||pgc.relname||'" RENAME TO '||lower(pgc.relname)||';'
FROM pg_catalog.pg_class pgc
LEFT JOIN pg_catalog.pg_namespace pgn ON pgn.oid = pgc.relnamespace
WHERE pgc.relkind ='r'
AND pgn.nspname='public'
ORDER BY 1;
```

Once you execute the script, simply save the output and execute it to perform the rename operation.
