---
layout: post
title: "MySQL punch user creation DDL"
categories: database
tags: mysql
image: white-office
---

You can get the DDL necessary to duplicate an existing user with the following system command:

```
MYSQL_CONN="-uroot -ppassword"
mysql ${MYSQL_CONN} --skip-column-names -A -e "SELECT CONCAT('SHOW GRANTS FOR ''',user,'''@''',host,''';')
FROM mysql.user
WHERE user<>'' " | mysql ${MYSQL_CONN} --skip-column-names -A | sed 's/$/;/g' > MySQLUserGrants.sql
```

This might not look like much, but this can prove extremely useful. This method will produce a pure SQL dump of the MySQL grants. All there is left to do is to execute the script on a new server, like so:

```sql
mysql -uroot -p -A < MySQLUserGrants.sql
```
