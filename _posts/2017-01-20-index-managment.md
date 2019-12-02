---
layout: post
title: "Index managment"
categories: journal
tags: oracle
image:
  feature: workshop-tools.jpg
  teaser: workshop-tools-teaser.jpg
---
In this article, I'll show you various ways to move an index to another tablespace when you need to reorganize database objects or free some space.

## Move an index on a different tablespace

Simple and efficient. Will work flawlessly for small indexes (> 200-300 Mb)

```sql
Alter index index_name rebuild
tablespace new_tablespace_name;

Alter index ITEM_SELL rebuild online tablespace ACCOUNT compute statistics;

```

## Change initial and next index storage parameters

Here's how to change index storage parameters without having to rebuild the object entirely.

```sql
ALTER INDEX index_name
 REBUILD STORAGE (
   INITIAL 1M
   NEXT 1M
 );
```

## Rename an index

```sql
ALTER INDEX index_name RENAME TO new_name;
```

## Rebuild multiple indexes using PARALLEL

```sql
SELECT 'ALTER INDEX '||OWNER||'.'||INDEX_NAME||' REBUILD ONLINE PARALLEL 8;'
FROM DBA_INDEXES;
-- And execute the output.

Alter index OWNER.INDEX_NAME rebuild online parallel 8;
```

Of course, you can change the parallel value if needed.
Then you might need to change the parallel parameter for the indexes you've just rebuilt.

```sql
SELECT DEGREE, 'ALTER INDEX '||OWNER||'.'||INDEX_NAME||' NOPARALLEL;'
FROM DBA_INDEXES
WHERE DEGREE > '1';
```

## In case of trouble during the index rebuild process

If you ever get into trouble while rebuilding indexes and encounter the error **"ORA-08104: this index object 75350 is being online built or rebuilt"**, just get the OBJECT_ID of the index causing trouble, and use the following script to unlock it.

```sql
DECLARE
RetVal BOOLEAN;
OBJECT_ID BINARY_INTEGER;
WAIT_FOR_LOCK BINARY_INTEGER;
BEGIN
OBJECT_ID := 63556;
WAIT_FOR_LOCK := NULL;
RetVal := SYS.DBMS_REPAIR.ONLINE_INDEX_CLEAN (OBJECT_ID);
COMMIT;
END;
/
```

If this doesn't work, use this script to rebuild and clean all invalid indexes.

```sql
begin
isclean :=false;
while isclean=false
loop
isclean := DBMS_REPAIR.ONLINE_INDEX_CLEAN(dbms_repair.all_index_id,dbms_repair.lock_wait);
dbms_lock.sleep(10);
end loop;
end;
/
```
