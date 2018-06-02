---
layout: post
title: "Custom SQL Prompt"
categories: journal
tags: [documentation,sample]
image:
  feature: IMAGE.jpg
  teaser: IMAGE-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---


Amend your `$ORACLE_HOME\sqlplus\admin\glogin.sql` script and add the following to the end of the file.
`set sqlprompt "_user '@' _connect_identifier > "`

In Oracle 10g this will change correctly each time you issue a "conn" command.
For clients before 10g it won't change when you do a "conn" but will remain as the username/db you first connected to.
You can also use `_date` for the current date and `_privilege` for the privilege (eg SYSDBA) of the connected user.

For example:
```
SET sqlprompt '&_user@&_connect_identifier> '
SET LINES 150 PAGES 5000
```
