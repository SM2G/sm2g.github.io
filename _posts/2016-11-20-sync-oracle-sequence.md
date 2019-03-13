---
layout: post
title: "Sync Oracle sequences"
categories: journal
tags: oracle
image:
  feature: grey-cogs.jpg
  teaser: grey-cogs-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---

In a database copy scenario, or to fix an applicative bug, you may have to resync sequences. Basically, there's two ways to achieve this:

* Drop and recreate the sequence.

* Artificially invoke it to catch up with the real maximum ID used.

I advise using the first solution in most cases, as it will be instant and won't waste the server CPU resources needlessly. Here's how to do it:

``` SQL
-- Get the delta, here we'll assume 12345.

-- Alter the sequence to match the delta.
Alter sequence owner.sequence increment by 12345;

-- Invoke it once.
select owner.sequence.nextval from dual;

-- Quickly reset the increment.
Alter sequence owner.sequence increment by 1;
```

Be careful though, in a transaction intensive environment, an applicative session might use the sequence in between the last two SQL statements.

The other *safer* solution can also be used to sync sequences based on another database. Here's a practical example:

``` SQL
declare
val number(30);
begin
for seq in (select s.SEQUENCE_OWNER as s_SEQUENCE_OWNER
    , s.SEQUENCE_NAME as s_SEQUENCE_NAME
    , s.LAST_NUMBER as s_LAST_NUMBER
    , d.SEQUENCE_OWNER as d_SEQUENCE_OWNER
    , d.SEQUENCE_NAME as d_SEQUENCE_NAME
    , d.LAST_NUMBER as d_LAST_NUMBER
    FROM all_sequences@$dbLinkName s, sys.all_sequences d
    where s.SEQUENCE_OWNER = d.SEQUENCE_OWNER
    and s.SEQUENCE_NAME = d.SEQUENCE_NAME
    and s.LAST_NUMBER > d.LAST_NUMBER
    and s.SEQUENCE_OWNER NOT IN ('DBSNMP','SYS'))
LOOP
    dbms_output.put_line(RPAD(seq.s_sequence_name,30,' ')||'s_LAST_NUMBER: '||seq.s_LAST_NUMBER) ;
    Begin
    LOOP
        execute immediate 'select '||seq.d_SEQUENCE_OWNER||'.'||seq.d_SEQUENCE_NAME||'.nextval
        from dual' into val;
        exit when val >= seq.s_LAST_NUMBER ;
      END LOOP;
  End ;
  dbms_output.put_line(RPAD(seq.d_sequence_name,30,' ')||'val: '||val) ;
END LOOP;
END;
/

exit;
```
