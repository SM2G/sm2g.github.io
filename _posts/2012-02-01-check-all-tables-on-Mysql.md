---
layout: post
title: "Check all tables on Mysql"
categories: journal
tags: [mysql, database]
image:
  feature: bag.jpg
  teaser: bag-teaser.jpg
  credit:
  creditlink:
---

Check all tables on MySQL
Petite commande sympa pour checker et réparer toutes les tables de toutes les bases de données de MySql :

~~~SQL
mysqlcheck -u root -p --auto-repair --check --optimize --all-databases
~~~
