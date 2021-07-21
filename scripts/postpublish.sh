#!/bin/sh

GIT_TAG=$(git describe --abbrev=0 --tags)

$(cd example && npm install -f vue-notion@latest)

git add --all
git commit -m 'Update example'
git push --tags

# test: clear before github release
clear

gh release create $GIT_TAG -t "$GIT_TAG"
