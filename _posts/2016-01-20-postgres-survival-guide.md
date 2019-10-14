---
layout: post
title: "PostgreSQL Survival Guide"
categories: journal
tags: postgres
image:
  feature: survival-stove.jpg
  teaser: survival-stove-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---

PostgreSQL has been gaining a lot of popularity these days, so let's have a look at the basics of administering a PostgreSQL database. We'll cover the structure exploration, object manipulation and some user managment.

Quick remainder of some mainly used PostgreSQL datatypes:

| Name             | Storage size | Description                          |
|:-----------------|:------------:|-------------------------------------:|
| smallint         | 2 octets     | Small integer                        |
| integer          | 4 octets     | Integer                              |
| bigint           | 8 octets     | Big Integer                          |
| decimal          | variable     | Precision decimal                    |
| numeric          | variable     | Precision decimal                    |
| real             | 4 octets     | 6 decimals precision number          |
| double precision | 8 octets     | 15 decimals precision number         |
| smallserial      | 2 bytes      | 2 octets integer with auto-increment |
| serial           | 4 octets     | Integer with auto-increment          |
| bigserial        | 8 octets     | Big integer with auto-increment      |

* List all users

```sql
sam=# Select rolname, rolcanlogin, rolpassword, rolvaliduntil from pg_roles;
 rolname | rolcanlogin | rolpassword | rolvaliduntil
---------+-------------+-------------+---------------
 sam     | t           | ********    |
 cerbere | t           | ********    |
(2 rows)

sam=# \du
                             List of roles
 Role name |                   Attributes                   | Member of
-----------+------------------------------------------------+-----------
 my_user   | Superuser, Create DB                           | {}
 sam       | Superuser, Create role, Create DB, Replication | {}
```

* List all databases

```sql
sam-# \l
                                List of databases
    Name    |  Owner  | Encoding |   Collate   |    Ctype    | Access privileges
------------+---------+----------+-------------+-------------+-------------------
 my_user_db | sam     | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 postgres   | sam     | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 sam        | sam     | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 template0  | sam     | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/sam           +
            |         |          |             |             | sam=CTc/sam
 template1  | sam     | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/sam           +
            |         |          |             |             | sam=CTc/sam
```

* Create a database

```sql
sam=# Create database some_db;
CREATE DATABASE
```

* Connect to a database

```sql
sam=# \c some_db;
You are now connected to database "some_db" as user "sam".
```

* List all tables

```sql
some_db=# \dt
       List of relations
 Schema | Name | Type  | Owner
--------+------+-------+-------
 public | test | table | sam

```

* Create a table with a PK index and describe structure

```sql
some_db=# Create table test (test_col INTEGER PRIMARY KEY);
CREATE TABLE
some_db=# \dp
                          Access privileges
 Schema | Name | Type  | Access privileges | Column access privileges
--------+------+-------+-------------------+--------------------------
 public | test | table |                   |
(1 row)

some_db=# \di
             List of relations
 Schema |   Name    | Type  | Owner | Table
--------+-----------+-------+-------+-------
 public | test_pkey | index | sam   | test
 (1 row)

 some_db=# \d test
       Table "public.test"
   Column  |  Type   | Modifiers
 ----------+---------+-----------
  test_col | integer | not null
 Indexes:
     "test_pkey" PRIMARY KEY, btree (test_col)
```

Note that the maximum name length for a table name is 64, which is much more comfortable than the 30 character limit in Oracle.

* SQL operations, explain plan and quit

```sql 
sam=# Select * from produits;
 no_produit |   nom   | prix
------------+---------+------
          1 | Fromage | 9.99
          1 | Fromage | 9.99
          1 | Fromage | 9.99
          1 | Fromage |     
          1 | Fromage |     
          1 | Fromage | 9.99
          2 | Pain    | 1.99
          3 | Lait    | 2.99
(8 rows)

sam=# Explain select nom, prix from produits where prix > 5;
                       QUERY PLAN                        
---------------------------------------------------------
 Seq Scan on produits  (cost=0.00..1.10 rows=3 width=64)
   Filter: (prix > 5::numeric)

sam=# \q
```

SQL operations are quite familiar if you already know your way on an Oracle or a MySQL database.

Anyway, if you're stuck you can use **\?** for psql help or **\h** for a complete in-depth command-line help.
