---
layout: post
title: "Fixing the ORA-00600: [ktfbtgex-7] error"
categories: database
tags: oracle
image: container-jump
---
It was a normal day at the office, when I noticed an ORA-00600 on a production database. Upon investigation, I found the following details in the alert.log file:

```
ORA-00600: internal error code, arguments: [ktfbtgex-7], [2031625], [128], [2031624], [], [], [], []
```

This error was related to extent management bitmap for locally managed tablespaces. A new extent has not been created because it could not fit into its datafile. As I found more details about the **ktfbtgex-7** error code, here's how to interpret the error parameters:

*First argument of the error is the first block adress of the extent to create.
Second argument is the length of the extent to create.
Third argument is the last block adress in the datafile.*

As we can see in my example above:

2031625 + 128 = 2031753

2031753 - 2031624 = 129

So the error comes from this: **2031625 + 128 > 2031624**

As we can see that the extent is 129 bytes longer, and therefore it's not created by Oracle to avoid any data corruption. To fix this, you need to rebuild the extent management bitmap associated to the tablespace.

In this example, 2031625 is already greater than 2031624. Which definitively point a bitmap issue.

With the database in startup restrict mode. You can deduce the tablespace name from the trace file which provides the SQL statements.

And finally, here is how to rebuild the TEST tablespace bitmap (to be done as SYS user):

```sql
EXECUTE DBMS_SPACE_ADMIN.TABLESPACE_REBUILD_BITMAPS('TEST');
```
