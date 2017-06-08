---
layout: post
title: "MySQL partial import"
categories: journal
tags: [documentation,sample]
image:
  feature: stormtrooper-disk.jpg
  teaser: stormtrooper-disk-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---
Here's the situation. You have a dumpfile called *mysql.dmp* which contains a whole MySQL database dump. However you only need to import one table (or anything, but only a portion of that dumpfile).
Because MySQL dumps are simply SQL scripts, we can use sed in order to extract only the portion of the SQL instructions we want.

Let say the name of your table is **mytable** and the dumpfile containing the whole database is called **mysql.dmp**:

``` Bash
$ sed -n -e '/CREATE TABLE.*mytable/,/CREATE TABLE/p' mysql.dmp > mytable.dmp
```

This will copy in the file **mytable.dmp** what is located between 'CREATE TABLE mytable' and the next 'CREATE TABLE ...' corresponding to the next table.

Then, you can then proceed and adjust the content of the file **mytable.dmp** which contains the structure of the table *mytable*, and the data (a list of INSERT) without having to edit a large MySQL dump file. Suppose you only need the table structure, it's quite easy to remove all the INSERT lines.
