---
layout: post
title: "Check all tables on MySQL"
categories: journal
tags: mysql
image: macbook-lights
---

Data corruption is every DBA's worst nightmare and can happen anytime.
Use this command to check and repair all tables on a MySQL database :

```sql
mysqlcheck -u root -p --auto-repair --check --optimize --all-databases
```
