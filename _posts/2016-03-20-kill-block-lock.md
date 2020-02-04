---
layout: post
title: "Kill locked sessions"
categories: journal
tags: oracle
image: kill-gun
---
Sometimes, when there's many database sessions connected and depending on the user activity, locks can occur on a database. While this may only affect a few users, the problem is that with many sessions locked the server load will increase. And there's a risk of crashing the whole database if this happens to many user sessions at the same time.

Of course, as a professional you implemented some sort of monitoring system to keep an eye on those metrics. But to be really efficient and prepared if you encounter a sudden peak of user sessions locked (right after deploying a new application version, for example) the most efficient method is to have a script ready specifically for this task.

The following script does just that. It kills all sessions locked for more than two minutes and outputs you the result. You can use it manually when needed, or schedule it in a cron job.
Feel free to modify it to suit your needs.

```bash
#!/bin/sh

date

sqlplus -S login/password <<EOF

set pages 2000
set lines 140
set serveroutput on;

declare
nb_req number(30) := 0;
begin
for src in (select 'alter system kill session '''||sid||','||(select serial# from v\$session s where s.sid=l.sid)||'''' as req from v\$lock l where BLOCK = 1 and REQUEST = 0  and ctime > 120 order by CTIME desc)
loop
nb_req := nb_req+1;
dbms_output.put_line(src.req);
execute immediate src.req;
end loop;

dbms_output.put_line(nb_req||' sessions killed.');

end;
/
EOF
```
