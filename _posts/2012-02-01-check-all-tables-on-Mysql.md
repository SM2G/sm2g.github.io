---
layout: post
title: "Chack all tables on MySQL"
categories: journal
tags: [mysql]
image:
  feature: macbook-lights.jpg
  teaser: macbook-lights-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---

Check all tables on MySQL
Petite commande sympa pour checker et réparer toutes les tables de toutes les bases de données de MySql :

~~~SQL
mysqlcheck -u root -p --auto-repair --check --optimize --all-databases
~~~
