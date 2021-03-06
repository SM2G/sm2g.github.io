---
layout: post
title: "Create a read-only MySQL user"
categories: database
tags: mysql
---

Sometimes you just need to give access to some users of your database. As you don’t want theses users to modify or accidentally delete some data, it’s advisable to grant them only read access to the database.

Here’s how to provide only read privilege to a user:

```sql
grant select on database_name.* to 'username'@'%' identified by 'userpasswd';
grant select on otherdb_name.* to 'username'@'%' identified by 'userpasswd';

show grants for username;
+----------------------------------------------------------------------------------------------+
| Grants for username@%                                                                        |
+----------------------------------------------------------------------------------------------+
| GRANT SELECT ON database_name.* TO 'username'@'%' IDENTIFIED BY PASSWORD '*DE425F65DC78103D' |
+----------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)

flush privileges;
```
