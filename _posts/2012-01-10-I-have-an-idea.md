---
title: Second post
layout: post
tags: [idea, project]
---
This will read in blog/index.html, send it each pagination page in Liquid as paginator and write the output to blog/page:num/, where :num is the pagination page number, starting with 2. If a site has 12 posts and specifies paginate: 5, Jekyll will write blog/index.html with the first 5 posts, blog/page2/index.html with the next 5 posts and blog/page3/index.html with the last 2 posts into the destination directory.
