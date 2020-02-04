---
layout: post
title: "Data export/import on MySQL"
categories: journal
tags: mysql import export
image: import
---

MySQL provides you with a lot of flexibility when it comes to import or export data between databases.
Let's examine a few possibilities to export/import data:

### To export a whole database

The following command will export a whole MySQL database on a sql file:

```sql
mysqldump -u user DB_NAME > /tmp/file.sql
```

### To export a single table

The following command allows you to dump a table’s metadata and data into asql file:

```sql
mysqldump -u user DB_NAME TABLE_NAME > /tmp/fle.sql
```

### To export a portion of table data

It’s also possible to export data based on a sql criteria, like using a “where” clause on a sql query.
The following command shows how to export table data having an ID lower than 100:

```sql
mysqldump -u user -w "ID < 100" DB_NAME TABLE_NAME > /tmp/file.sql
```

### To import data into a MySQL database

And finally for the import part, here’s how to import data when you previously exported it on a sql file:

```sql
mysql -u user DB_NAME < tableNameFile.sql
```
