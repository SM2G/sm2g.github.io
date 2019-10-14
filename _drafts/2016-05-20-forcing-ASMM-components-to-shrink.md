---
layout: post
title: "Forcing ASMM component to shrink"
categories: journal
tags: [documentation,sample]
image:
  feature: IMAGE.jpg
  teaser: IMAGE-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---

Here's the way to force the shared pool to shrink dynamically. Documentation states that ASMM can only increase shared pool, and can't shrink.

When the automatic shared memory management feature is enabled, the internal
tuning algorithm tries to determine an optimal size for the shared pool
based on the workload. It usually converges on this value by increasing in
small increments over time. However, the internal tuning algorithm typically
does not attempt to shrink the shared pool, because the presence of open
cursors, pinned PL/SQL packages, and other SQL execution state in the shared
pool make it impossible to find granules that can be freed. Therefore, the
tuning algorithm only tries to increase the shared pool in conservative
increments, starting from a conservative size and stabilizing the shared
pool at a size that produces the optimal performance benefit.

Currently ASMM is enabled.

```sql
SQL> alter system set sga_target = 300M;

System altered.

SQL> alter system set shared_pool_size = 0;

System altered.

SQL> alter system set db_cache_size = 0;

System altered.

SQL> show sga

Total System Global Area  314572800 bytes
Fixed Size                  1261564 bytes
Variable Size             222298116 bytes
Database Buffers           88080384 bytes
Redo Buffers                2932736 bytes
```

Lets try to shink shared pool and increase db_cache_size

```SQL
SQL> alter system set shared_pool_size = 75M;

System altered.

SQL> alter system set db_cache_size = 200M;

alter system set db_cache_size = 200M

*

ERROR at line 1:

ORA-32017: failure in updating SPFILE

ORA-00384: Insufficient memory to grow cache
```

Now lets switch to manual mode temporarily

```sql
SQL> alter system set sga_target = 0;

System altered.

SQL> alter system set shared_pool_size = 75M;

System altered.

SQL> alter system set db_cache_size = 200M;

System altered.

SQL> show sga

Total System Global Area  314572800 bytes
Fixed Size                  1261564 bytes
Variable Size             100663300 bytes
Database Buffers          209715200 bytes
Redo Buffers                2932736 bytes
```

Voila! We have successfully decreased shared pool and increased the db_cache_size.
Now let switch back to ASMM mode.

```sql
SQL> alter system set sga_target = 300M;

System altered.

SQL> alter system set shared_pool_size = 0;

System altered.

SQL> alter system set db_cache_size = 0;

System altered.

SQL> show sga

Total System Global Area  314572800 bytes
Fixed Size                  1261564 bytes
Variable Size              92274692 bytes
Database Buffers          218103808 bytes
Redo Buffers                2932736 bytes
```
