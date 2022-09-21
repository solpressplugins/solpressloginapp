### Sept21
- Added `APP_SECRET` and `ADMIN_AUTH_TOKEN` environment variables 
- Added auth middleware to validate admin and wp user requests for specific routes.
- Removed `WP_AUTH_TOKEN` environment variable
- ** Allow shortcode option to set button label.
- Fixed issue with login for exisiting publickeys. 
  
### Sept15
- renamed KEY ennvironment variable to WP_AUTH_TOKEN
- Added Eslint config.
- Server now listens after successful DB connection


### Sept13
- Moved index.js into src folder.
- Added additional build scripts in package.json for Heroku deployment