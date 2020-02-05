---
layout: post
title: "Configure SSL Certificates on AWS EBS"
categories: devops
tags: AWS devops
---

Elastic Beanstalk is a fantastic way to deploy and manage web applications. Today, for most web apps, you'll need SSL certificates to encrypt data between users and your server. For this, we'll use **Let’s Encrypt** Certificate Authority which provides free SSL certificates and is supported by a wide array of browsers.

To generate the certificate, we'll use **Certbot**, which is the official Let’s Encrypt client, and is also developed by the Electronic Frontier Foundation. **Certbot** will automatically fetch and deploy SSL/TLS certificates for your server.

First, get **Certbot** to generate the SSL certificate
```bash
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
```

Then, cut all NGINX or other process using port 80 and request your certificate. Be careful of API calls limit on Let's Encrypt servers.
```bash
./certbot-auto certonly --standalone -d [www.mydomain.com] --debug
```

Finally, update your NGINX config like so to use the newly generated certificates and also to redirect incoming traffic to the HTTPS server.
```json
# /etc/nginx/sites-enabled/elasticbeanstalk-nginx-docker-proxy.conf
[...]

server {
    listen      80 default;
    server_name [www.mydomain.com]
    access_log  off;
    error_log   off;
    ## redirect http to https ##
    return      301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;

    ssl_certificate /etc/letsencrypt/live/[www.mydomain.com]/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/[www.mydomain.com]/privkey.pem;
[...]
}
```

Ensure that you have open port 443 (HTTPS) on your security groups attached to the instance and you're good to go!

## Troubleshooting

If you encounter a Python error about cryptographic packages missing, add the following symlinks.
```bash
ln -s /opt/eff.org/certbot/venv/local/lib64/python2.7/dist-packages/cryptography /opt/eff.org/certbot/venv/local/lib/python2.7/dist-packages/cryptography
ln -s /opt/eff.org/certbot/venv/local/lib64/python2.7/dist-packages/cryptography-2.0.2.dist-info /opt/eff.org/certbot/venv/local/lib/python2.7/dist-packages/cryptography-2.0.2.dist-info
ln -s /opt/eff.org/certbot/venv/local/lib64/python2.7/dist-packages/cffi /opt/eff.org/certbot/venv/local/lib/python2.7/dist-packages/cffi
ln -s /opt/eff.org/certbot/venv/local/lib64/python2.7/dist-packages/cffi-1.10.0.dist-info /opt/eff.org/certbot/venv/local/lib/python2.7/dist-packages/cffi-1.10.0.dist-info
ln -s /opt/eff.org/certbot/venv/local/lib64/python2.7/dist-packages/_cffi_backend.so /opt/eff.org/certbot/venv/local/lib/python2.7/dist-packages/_cffi_backend.so
ln -s /opt/eff.org/certbot/venv/local/lib64/python2.7/dist-packages/.libs_cffi_backend /opt/eff.org/certbot/venv/local/lib/python2.7/dist-packages/.libs_cffi_backend
ln -s /opt/eff.org/certbot/venv/local/lib64/python2.7/dist-packages/zope.interface-4.1.3-py2.7-nspkg.pth /opt/eff.org/certbot/venv/local/lib/python2.7/dist-packages/zope.interface-4.1.3-py2.7-nspkg.pth
ln -s /opt/eff.org/certbot/venv/local/lib64/python2.7/dist-packages/zope.interface-4.1.3-py2.7.egg-info /opt/eff.org/certbot/venv/local/lib/python2.7/dist-packages/zope.interface-4.1.3-py2.7.egg-info
ln -s /opt/eff.org/certbot/venv/local/lib64/python2.7/dist-packages/zope/interface /opt/eff.org/certbot/venv/local/lib/python2.7/dist-packages/zope/interface
```
Also add the following package.
```bash
sudo /opt/eff.org/certbot/venv/local/bin/pip install cryptography interface
```

## Add Password Authentication

If you have OpenSSL installed on your server, you can create a password file without adding additional packages. We will create a hidden file called `.htpasswd` in the `/etc/nginx` configuration directory to store our username and password combinations.

```bash
sudo sh -c "echo -n '[USERNAME]:' >> /etc/nginx/.htpasswd"
sudo sh -c "openssl passwd [MyPassword] >> /etc/nginx/.htpasswd"
```

Then add the following configuration in your NGINX configuration file.

```json
server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;

    root /usr/share/nginx/html;
    index index.html index.htm;

    server_name localhost;

    location / {
        try_files $uri $uri/ =404;
        auth_basic "Restricted Content";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
}
```
