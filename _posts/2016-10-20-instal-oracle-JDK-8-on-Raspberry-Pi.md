---
layout: post
title: "Install Oracle JDK 8 on Raspberry Pi"
categories: post
tags: [documentation,sample]
image:
  feature: ceramic-coffee.jpg
  teaser: ceramic-coffee-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---
In this post, I'll show you how to download and install **Oracle JDK** 8 on a Raspberry Pi.

Visit [Oracle download website](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) and click the download button for **Java Platform (JDK) 8**. Then accept the license agreement and proceed to download the **Linux ARM x32** version.

Login to your Raspberry Pi and extract the archive in the /opt directory.
``` Bash
$ sudo tar zxvf jdk-8-linux-arm-[...].gz -C /opt
```

Set the default java and javac to the new installed jdk8 version.

```
$ sudo update-alternatives --install /usr/bin/javac javac /opt/jdk1.8.[...]/bin/javac 1
$ sudo update-alternatives --install /usr/bin/java java /opt/jdk1.8.[...]/bin/java 1

$ sudo update-alternatives --config javac
$ sudo update-alternatives --config java
```

After all, verify with the commands with *-version* option.

```
$ java -version
java version "1.8.0_131"
Java(TM) SE Runtime Environment (build 1.8.0_131-b11)
Java HotSpot(TM) Client VM (build 25.131-b11, mixed mode)
$ javac -version
javac 1.8.0_131
```
