---
layout: post
title: "Managing IAM users"
categories: devops
tags: AWS Cloud IAM
---

In PostgreSQL, users can have many namespaces to resolve objects names. These are called schemas like in Oracle, and can be altered through the `search_path` variable. Here's how to check current search path:

```sql
SHOW search_path;

/* Result
search_path
------------------
"$user", public
*/
```

Usually it defaults to the **username** and **public**.
So when you create objects, they are initially created in the default PUBLIC schema.
```sql
CREATE TABLE my_table
(
	id INTEGER PRIMARY KEY,
  name CHARACTER VARYING(30)
);
```

Here are two SELECT statements which have no any difference because when we are using the database object without the schema identifier, it fetches from the default PUBLIC schema.

```sql
SELECT count(*) FROM my_table;
SELECT count(*) FROM public.my_table;
```

But when we are dealing with only one schema and if you want to change your default schema search path, you can use below script to change default schema search path.

```sql
-- For the session
SET search_path TO schema_name;
-- To permanently change the schema
ALTER USER username SET search_path = schema_name;
```
