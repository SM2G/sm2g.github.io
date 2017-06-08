---
layout: post
title: "Shared pool purge"
categories: post
tags: [documentation,sample]
image:
  feature: oil-pump.jpg
  teaser: oil-pump-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---
A few days ago, I was trying to optimize a single SQL statement in a production environment. The statement was using bind variables, so the plan would change to a different (sub-optimal) plan as adaptive cursor sharing was kicking in. I needed to flush that plan out of the shared pool *without* flushing the entire pool. Here's how to do that.

Get the **SQL_ID** of the statement you want to purge and look up the cursor info using the following query:

``` SQL
Select address, hash_value
From v$sqlarea
Where sql_id LIKE '97y75c8x7jumc';

ADDRESS          HASH_VALUE
---------------- ----------
00000000A9F34F98 1682024353
```

The 2nd parameter we'll need is a flag. The flag defaults to 'P'. The valid values for flag are:

* P name of a package/procedure/function

* T name of a type

* R name of a trigger

* Q name of a sequence

Note that you don't see a value for a SQL cursor address specifically listed. If you're going to set the name value to a cursor address, the flag parameter should be set to any character except one of the 4 listed. So, I typically use 'C' (for cursor) or 'S' (for SQL) as the flag parameter value.

The final parameter is for the heaps/locations to be purged. The default of 1 means to purge the whole object so you'll always use the default for a single SQL statement flush.

Now that you have these values, you simply execute the call to the purge procedure:

``` SQL
exec dbms_shared_pool.purge('00000000A9F34F98, 1682024353','C');

PL/SQL procedure successfully completed.
```

If you check the shared pool again after the purge successfully completes, you'll find that the query returns no rows.

``` SQL
select address, hash_value from v$sqlarea where sql_id like '97y75c8x7jumc';

no rows selected
```

Finally, when everything fails, here's how to purge the whole **Shared Pool**.

``` SQL
begin
For src in (select address||','||hash_value as addr_hash
from v$sql where last_active_time < sysdate - 3)
loop
    dbms_shared_pool.purge (src.addr_hash,'C');
end loop;
end;
/
```
