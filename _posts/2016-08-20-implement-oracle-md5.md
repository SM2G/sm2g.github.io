---
layout: post
title: "Implement an MD5sum function in Oracle"
categories: journal
tags: [oracle]
image:
  feature: old-typewriter.jpg
  teaser: old-typewriter-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---

A few days ago, I was looking for a way to get an **MD5sum function** to work directly in Oracle, like the MD5() function in MySQL. After some searching I found out that there was no direct way to generate an MD5 checksum in Oracle. However, the function exists in the Oracle supplied package **dbms_obfuscation_toolkit**, so here's the way to make a usable function that will call this package and get the checksum.

``` SQL
CREATE OR REPLACE FUNCTION USER.md5hash (str IN VARCHAR2)
	RETURN VARCHAR2
	IS v_checksum VARCHAR2(32);
	BEGIN
		v_checksum := LOWER( RAWTOHEX( UTL_RAW.CAST_TO_RAW( sys.dbms_obfuscation_toolkit.md5(input_string => str) ) ) );
		RETURN v_checksum;
		EXCEPTION
			WHEN NO_DATA_FOUND THEN
			NULL;
		WHEN OTHERS THEN
			-- Consider logging the error and then re-raise
			RAISE;
	END md5hash;
/
```

This simple function uses the **sys.dbms_obfuscation_toolkit.md5** function's raw byte array, convert it to a hexadecimal string and convert that string to all lowercase characters. This way you can easily convert strings to MD5.

For example:

``` SQL
SELECT md5hash('foo')
FROM dual;

! md5 -s 'foo'
MD5 ("foo") = acbd18db4cc2f85cedef654fccc4a4d8
```

Both commands return **acbd18db4cc2f85cedef654fccc4a4d8**, which is the MD5 result we were expecting.
