---
layout: post
title: "How to write to the alert log"
categories: journal
tags: [documentation,sample]
image:
  feature: red-keyboard.jpg
  teaser: red-keyboard-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---

Juste in case you wondered, yes it is possible to write custom messages directly to the alert log. For this, you'll have to use the procedure **ksdwrt** stored in the **dbms_system** supplied package.
This can be a useful way to implement custom messages when you execute a stored procedure, or it can help with testing by generating alerts.

``` SQL
SQL> execute dbms_system.ksdwrt(2, 'TEST --- write to log');
```

or you can include a time-stamp as well.

``` SQL
SQL> execute sys.dbms_system.ksdwrt(2,to_char(sysdate)|| ' -- ');
```

The first parameter can be **1**, **2** or **3**.

1. Writes to the **alert log**.

2. Writes to the **trace file**.

3. Writes to **both**.
