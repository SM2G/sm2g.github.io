---
layout: post
title: "Resolving the “ERROR 126 Incorrect key file” error"
categories: database
tags: mysql
---
The Incorrect key file error:

```
ERROR 126 (HY000) at line 3: Incorrect key file for table '/var/tmp/#sql3f5_1b6c4e_1.MYI'; try to repair it
```

This error probably means that you ran out of disk space on /var/tmp while MySQL was trying to create a temporary table to resolve a complex query. The generation of temporary tables can be caused by derived tables (like a subselect) or filesort kicking in when you use ORDER BY.

To fix this error, you can use any of the following solutions:

* Put temporary tables on a bigger filesystem., and add the new path to my.cnf:
  ```
  [mysqld]
  tmpdir=/path/to/large/filesystem/mysql-tmp-dir
  ```

* Avoid using a subselect. Rephrasing it as a join, using SELECT STRAIGHT_JOIN will override the query optimizer to get your performance back.

* Avoid sorting, or sort the smallest dataset possible. For example:
  ```sql
  SELECT id, my_huge_text_field
  FROM table
  ORDER BY another_field;
  ```

Will run faster if you restructure the query like so:
```sql
SELECT id, my_huge_text_field
FROM table
JOIN (SELECT id
      FROM table
      ORDER BY another_field) AS derived_table USING (id);
```

In the first example, filesort will operate over all the selected data (including the huge text field). In the second example, the temporary table will only contain the id column, and the outer query will fetch the text chunks.

This article has been tested on MySQL 5.1.
