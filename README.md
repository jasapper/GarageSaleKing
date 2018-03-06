# GarageSaleKing
A single page app (SPA) to offer a crowd-sourced collection of nearby garage/yard sales. All visitors may view the events nearby but must login using a social media account (Google, Facebook or Twitter) to post their own events. Events may have up to five (5) images included to show available items.

## Technology Stack
* ReactJS
* Redux for application state management
* ExpressJS middleware
* NodeJS backend
* MongoDB database
* PassportJS for authentication
* AWS S3 for image storage
* Geocoder for Google location proximities
* MaterializeCSS for styling eye candy

## Deployment
Deployed to production environment on a Digital Ocean droplet. SSL certificate loaded/provided by Let's Encrypt.

## Screen Shots
![Dashboard view](https://github.com/jasapper/GarageSaleKing/raw/master/screenies/Screenshot_dashboard.png "Dashboard view")
![Details view](https://github.com/jasapper/GarageSaleKing/raw/master/screenies/Screenshot_details.png "Details view")
![New Sale view](https://github.com/jasapper/GarageSaleKing/raw/master/screenies/Screenshot_newsale.png "New Sale view")

## Installation
NodeJS 8.9.4+ must already be installed on your local system!
After cloning the repo to your local drive open your terminal/command prompt.
Switch to the main app directory and run `npm install`.
The switch to the `client` subdirectory and run `npm install` again.
You should now be ready to start the development server by running `npm run dev`.

## Future Development
Adding aggregation of external garage sale sources to show alongside user created events. Scraping Craigslist and local newspaper web sites would be ideal but have employed various methods of defeating most scrapers so this enhancement will require significant time and resources. NightmareJS should take care of this nicely (but not easily). Stay tuned!
