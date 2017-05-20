---
layout: post
title: "PL/SQL loop through a set of values"
categories: journal
tags: [documentation,sample]
image:
  feature: hallway-loop.jpg
  teaser: hallway-loop-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---
Here's a simple trick on how to make a **PL/SQL loop** iterate through a set of predefined values.
This can be useful when you need to perform a report query on a set of Oracle user account, or to query a set of specific dictionary objects for example.

Note that you can also make this static list a dynamically generated list.

``` SQL
set serveroutput on

DECLARE
    type nt_type is table of VARCHAR2(30);
    nt nt_type := nt_type ('Choice_1', 'Choice_2'
    , 'Choice_3', 'Choice_4'
    , 'Choice_5', 'Choice_6');
BEGIN
  FOR i IN 1..nt.count
  LOOP
    dbms_output.put_line(nt(i));
  END LOOP;
END;
/
```
