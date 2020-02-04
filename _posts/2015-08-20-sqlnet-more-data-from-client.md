---
layout: post
title: "SQL*Net more data from client"
categories: journal
tags: oracle network
image: traffic-blur
---

The error *SQL*Net more data from client* usually happens when there's a large amount of data sent from client (or other database in case of dblinks), which doesn't fit into single SDU size Oracle packet. The server process knows that the call hasn't ended and there is more data/packets to come before the call ends.

Also, the *large amount of data* may actually mean few kB only, but these waits appear as long as the whole call's data doesn't fit into one single SDU size packet. The SDU size can range from 512 bytes to 65535 bytes. The default SDU for the client and a dedicated server is 8192 bytes, while the default SDU for a shared server is 65535 bytes.

The first session data unit (SDU) bufferful of return data is written to TCP socket buffer under *SQL*Net message to client* wait event.

So this one particular wait event *SQL*Net more data from client* will include the network time along with some processing time from the user tool process, so it can indicated either network latency or a problem in the tool. The only problem I guess is there isn't much way to know whether the slow down is because of the network or a problem in the tool.

However, it appears that time is logged to that event only until the packet is turned over to the network. It appears that Oracle then starts logging time to the *SQL*Net more data FROM client* event while it waits for the next response from the client. Therefore, the actual network transfer time is clocked to the wrong event. You can understand why the developers made this choice, because Oracle has no way of knowing how long it actually takes the packet to get to the client. It only knows how long the round trip takes. So maybe they should have named the event slightly differently, like *SQL*Net more data from client including the entire round trip network time* or something.
