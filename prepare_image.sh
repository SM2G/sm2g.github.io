

if [[ $# != 2 ]]
    then echo "Usage: $0  \"[image URL]\" [keyword]"
    exit
fi

image=$1
keyword=$2

wget -q "${image}" -O ${keyword}.jpg

# Images were designed to be 1024x600 pixels, with teaser images being 1024x380 pixels.

echo "Generating ${keyword}.jpg image..."
convert ${keyword}.jpg -resize 1024x600^ -gravity center -extent 1024x600 images/${keyword}.jpg

echo "Generating ${keyword}-teaser.jpg image..."
convert ${keyword}.jpg -resize 1024x300^ -gravity center -extent 1024x380 images/${keyword}-teaser.jpg

echo "Cleanup."
rm ${keyword}.jpg
