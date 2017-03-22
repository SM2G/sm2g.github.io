---
title: Check all tables on Mysql
layout: post
category: aaa
tags: [mysql, database]
---

Check all tables on MySQL
Petite commande sympa pour checker et réparer toutes les tables de toutes les bases de données de MySql :

~~~SQL
mysqlcheck -u root -p --auto-repair --check --optimize --all-databases
~~~
