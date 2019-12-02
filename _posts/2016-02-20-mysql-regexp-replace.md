---
layout: post
title: "MySQL regexp Replace"
categories: journal
tags: mysql
image:
  feature: two-cars.jpg
  teaser: two-cars-teaser.jpg
---

MySQL provides you with a useful string function called REPLACE that allows you to replace a string in a column of a table by a new string. The REPLACE function is very handy to search and replace text which affects multiple records such as obsolete URL, spelling mistake and such.

The syntax of REPLACE function is as follows:

```sql
UPDATE tbl_name
SET field_name = REPLACE(field_name, string_to_find, string_to_replace)
WHERE conditions;
```

Note that when searching for text to replace, MySQL uses case-sensitive match to perform search for string to be replaced.

For example, if you want to correct the spelling mistake in the products table in the sample database, you use the REPLACE function as follows:

```sql
UPDATE products
SET productDescription = REPLACE(productDescription,'abuot','about');
```

The query will look at the column productDescription of the table products and find for all occurrences of spelling mistake **'abuot'** and replace it by the correct word **'about'**.

It is very important to note that in the REPLACE function, the first parameter is the field name without quotes. If you put the quotes to the field name like 'field_name', the query will update the content of that column to 'field_name', which can cause some unexpected data loss.
