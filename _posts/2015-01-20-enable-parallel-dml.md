---
layout: post
title: "Enable parallel DML"
categories: journal
tags: [oracle, sql]
image:
  feature: highway-night.jpg
  teaser: highway-night-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---
Effectively using parallel DML can speed up data manipulation.

By the way, DML stands for (Data Manipulation Language), and refers to Insert, Update and Delete which plays at the row level. DDL (Data Definition Language) refers to Create, Alter or Drop statements and is used to change the structure of database objects.

Using parallel DML is useful if you have a SQL statement that manipulates a lot of rows, like so:

``` SQL
alter session enable parallel dml;

-- to set a paralelism of 4 (aka degree of paralelism)
insert /*+ PARALLEL(big_alias, 4) */ into my_huge_table big_alias
select * from emp;
commit;

alter session disable parallel dml;
```

You can ensure parallel DML is activated by looking at the open sessions. When activated, a number of sessions are opened as you defined the degree of paralelism in the hint.
