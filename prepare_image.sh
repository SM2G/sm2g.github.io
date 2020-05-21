#!/bin/bash

if [[ $# != 2 ]]
    then echo "Usage: $0  \"[image]\" [keyword]"
    exit
fi

image=$1
keyword=$2

# Images were designed to be 348x130 pixels, with teaser images being 1110x380 pixels.

echo "Generating cat-${keyword}.jpg image..."
convert ${image} -resize 1110x380^ -gravity center -extent 1110x380 "assets/images/categories/cat-${keyword}.jpg"

echo "Generating cat-${keyword}-teaser.jpg image..."
convert ${image} -resize 348x130^ -gravity center -extent 348x130 "assets/images/categories/cat-${keyword}-teaser.jpg"

echo "Cleanup."
rm ${image}
