

if [[ $# != 2 ]]
    then echo "Usage: $0  \"[image URL]\" [keyword]"
    exit
fi

image=$1
keyword=$2

wget -q "${image}" -O ${keyword}.jpg

# Images were designed to be 348x130 pixels, with teaser images being 1110x380 pixels.

echo "Generating ${keyword}.jpg image..."
convert ${keyword}.jpg -resize 1110x380^ -gravity center -extent 1110x380 assets/images/${keyword}.jpg

echo "Generating ${keyword}-teaser.jpg image..."
convert ${keyword}.jpg -resize 348x130^ -gravity center -extent 348x130 assets/images/${keyword}-teaser.jpg

echo "Cleanup."
rm ${keyword}.jpg
