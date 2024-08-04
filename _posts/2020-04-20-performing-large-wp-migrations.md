---
layout: post
title: "Performing large WordPress migrations"
categories: devops
tags: wordpress aws
---

In order to perform a migration, for example from a new Wordpress instance to the production one, the best tool currently is **All-in-One WP Migration Plugin**. However, this plugin has a paid limitation to 512MB.

To get rid of the *512MB Upload Limit* for the All-in-One WP Migration Plugin, you can download an older version *6.77* that doesn't have the limitation [here](https://www.onepagezen.com/all-in-one-wp-migration-unlimited-extension-free/) and that'll do the job just fine.

Simply install the plugin and follow the procedure to perform the migration. For extra safety you can delete the plugin once the migration has been successfully completed.
