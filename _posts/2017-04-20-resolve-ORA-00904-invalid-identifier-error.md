---
layout: post
title: "Resolve the ORA-00904 invalid identifier error"
categories: journal
tags: oracle
image:
  feature: reflect-run.jpg
  teaser: reflect-run-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---
Eventually, you'll issue a valid SQL statement and *SQL*Plus* will return the error **ORA-00904 invalid identifier**. First, make sure it's not a typo and you typed a valid and existing column name.
If the column exists you should be able to query it and not get this error. The *invalid identifier* error most commonly happens when you are referencing an invalid alias in a select statement.

As a remainder, to avoid **ORA-00904**, column names cannot be an Oracle reserved keyword and must contain these four criteria to be valid:

+ Begin with a letter
+ Have a maximum length of thirty characters
+ Consist only of alphanumeric or special characters such as underscore.

Also, as an advice, avoid using lowercase or any other special character. Although it's possible to do so using double quotes when defining a column name, it's prone to errors and will slow investigation when troubleshooting as it's just not the standard way to do.

In my case, the error was due to an invalid index after a column rename. So I just dropped and recreated the index.

```sql
-- Create the new index
Create index schema.new_index (col1, col2, col3) tablespace my_tablespace online;

-- Drop the old
Drop index schema.old_index;

-- Rename to be clean
Alter index schema.new_index rename to old_index;
```
