---
title: Mysql transaction isolation
layout: post
category: aaa
tags: [mysql, database]
---
Vous pouvez connaître les niveaux d'isolation de transaction de session et global avec ces commandes :

~~~SQL
SELECT @@global.tx_isolation;
SELECT @@tx_isolation;
SET [SESSION | GLOBAL] TRANSACTION ISOLATION LEVEL
                      {READ UNCOMMITTED | READ COMMITTED
                        | REPEATABLE READ | SERIALIZABLE}


-- Prepare session
SET autocommit = 0;
Set session TRANSACTION ISOLATION LEVEL READ COMMITTED;
Set session TRANSACTION ISOLATION LEVEL SERIALIZABLE;
~~~

All transactions in "Oracle" mode now.

~~~SQL
Select * from testInnoDB WHERE Col1=1 and Col2=0 for update;

delimiter /

DECLARE
v_freeline NUMBER;
BEGIN
Select count(*) into v_freeline from testInnoDB WHERE Col1=1 and Col2=0;
IF v_freeline >= 1 THEN
echo "cool"
END IF;
END;
/

Select * FROM testInnoDB WHERE Col1 = 3 for update;
~~~
