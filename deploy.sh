#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vitepress/dist

# 如果是发布到自定义域名
# echo 'xxx' > CNAME

git init
git remote add origin https://github.com/sjhleo/sjhleo.github.io.git
git branch -M main
git add -A
git commit -m 'deploy'

# 如果你想要部署到 https://<USERNAME>.github.io
git push -f https://github.com/sjhleo/sjhleo.github.io.git main

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
# git push -f  https://github.com/sjhleo/vitepress-blog.git master:gh-pages

cd -