---
layout: post
title: "Resolve PLAN_TABLE is old version error"
categories: post
tags: [documentation,sample]
image:
  feature: old-table.jpg
  teaser: old-table-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---
When displaying execution plans on SQL*plus, you may notice an information message like so:

``` SQL
-------------------------------------------------------------------------------------------------
| Id  | Operation                    | Name                        | Rows  | Bytes | Cost (%CPU)|
-------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT             |                             |     1 |   129 |     2   (0)|
|   1 |  NESTED LOOPS                |                             |     1 |   129 |     2   (0)|
|   2 |   TABLE ACCESS BY INDEX ROWID| ADVERT_MAPPING              |     1 |     8 |     1   (0)|
|*  3 |    INDEX UNIQUE SCAN         | ADVERT_MAPPING_UNIQUE_ALIAS |     1 |       |     1   (0)|
|*  4 |   TABLE ACCESS BY INDEX ROWID| ADVERT_PROFILE              |     1 |   121 |     1   (0)|
|*  5 |    INDEX RANGE SCAN          | ADVERT_PROFILE_FK_MAPPING   |  5549 |       |     1   (0)|
-------------------------------------------------------------------------------------------------
Predicate Information (identified by operation id):
---------------------------------------------------
   3 - access("ADVERT_MAPPING"."ALIAS"=:V1)
   4 - filter("ADVERT_PROFILE"."ALIAS" IS NOT NULL AND
              ("ADVERT_PROFILE"."ADP_STATUS_CODE"=TO_NUMBER(:V4) OR
              "ADVERT_PROFILE"."ADP_STATUS_CODE"=TO_NUMBER(:V5)) AND
              "ADVERT_PROFILE"."USER_ACCOUNT_ID"=TO_NUMBER(:V2) AND
              "ADVERT_PROFILE"."ADP_TYPE_CODE"=TO_NUMBER(:V3))
   5 - access("ADVERT_MAPPING"."ADVERT_MAPPING_ID"="ADVERT_PROFILE"."ADVERT_MAPPING_ID")
Note
-----
   - 'PLAN_TABLE' is old version
```

To get rid of this message, and get a better view of your execution plans, simply execute the utlxplan script in the admin folder of the oracle home.

``` SQL
SQL> @$ORACLE_HOME/rdbms/admin/utlxplan.sql

Table created.

Elapsed: 00:00:00.56
```

Now you get slightly better-looking execution plans (the Time column is nice, but wrong most of the time) and the message is gone.
