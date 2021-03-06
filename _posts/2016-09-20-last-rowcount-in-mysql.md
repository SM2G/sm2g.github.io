---
layout: post
title: "Last rowcount in MySQL"
categories: database
tags: mysql
---
Suppose you want to count the number of lines returned by the last SQL statement issued.
For **select** statements you can use the *FOUND_ROWS* construct:

```sql
SELECT SQL_CALC_FOUND_ROWS something
FROM your_table
WHERE whatever;

SELECT FOUND_ROWS();
```

This will return the number of rows in the last **select** query (or if the first query has a **LIMIT** clause, it returns the number of rows there would've been without the **LIMIT**).

Also, for **DML** (insert, update, delete), use the *ROW_COUNT* construct to return the number of affected rows:

```sql
INSERT INTO your_table
VALUES (1,2,3);

SELECT ROW_COUNT();
```
