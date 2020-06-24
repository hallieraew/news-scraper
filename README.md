# Mongo News Scraper

## Overview

This application scrapes the New York Times website for news articles and saves them to a Mongo database. When the user launches the web application, articles from the db are appended to the page. 


![Screenshot of home page.](public/assets/images/home.png)


Users can scrape for new articles which then save to the db as well. Users can save articles which appear in a separate page and then users can comment/leave notes.

![Screenshot of saved articles.](public/assets/images/saved.png)


![Screenshot comment modal for users.](public/assets/images/comment.png)

## Future Development

Although users can leave comment, they do not seem to be saving to specific articles. Any comment button will pull up a previously added comment. Remove button is also not live - will not delete from the DB.

## Tech Spec

This application was built with JavaScript, jQuery, HTML, CSS, and Bootstrap.

This application requires an install of the following:
 
 - Express
 - Mongoose
 - Axios
 - Cheerio

## Deploy

This application can be found deployed on Heroku : https://immense-chamber-10722.herokuapp.com/
