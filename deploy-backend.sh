# make sure heroku is deployed like
# heroku create volp-backend --remote heroku-backend
# heroku buildpacks:set heroku/nodejs
# https://medium.com/@shalandy/deploy-git-subdirectory-to-heroku-ea05e95fce1f

git subtree push --prefix backend heroku-backend master
