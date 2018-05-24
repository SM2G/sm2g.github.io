---
layout: post
title: "Configure SSL Certificates on AWS EBS"
categories: journal
tags: [documentation,sample]
image:
  feature: padlock-blur.jpg
  teaser: padlock-blur-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---

Elastic Beanstalk is a fantastic way to deploy and manage web applications. Today, for most web apps, you'll need SSL certificates to encrypt data between users and your server. For this, we'll use **Let’s Encrypt** Certificate Authority which provides free SSL certificates and is supported by a wide array of browsers.

To generate the certificate, we'll use **Certbot**, which is the official Let’s Encrypt client, and is also developed by the Electronic Frontier Foundation. **Certbot** will automatically fetch and deploy SSL/TLS certificates for your server.

First, get **Certbot** to generate the SSL certificate
```
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
```

Then, cut all NGINX or other process using port 80 and request your certificate.
```
./certbot-auto certonly --standalone -d [www.mydomain.com]
```

Finally, update your NGINX config like so.
```
# /etc/nginx/sites-enabled/elasticbeanstalk-nginx-docker-proxy.conf
[...]
server {
    listen 443 ssl;

    ssl_certificate /etc/letsencrypt/live/[www.mydomain.com]/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/[www.mydomain.com]/privkey.pem;
[...]
```

Ensure that you have open port 443 (HTTPS) on your security groups attached to the instance and you're good to go!
