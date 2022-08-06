<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Dog taker #
 
 ## Book a date for a walk with the dog from the shelter ##
 ## The application has a typical nest structure: ##
  * Folders are divided according to what they are responsible for
  * Each folder contains a module file with configuration, a controller file that performs the tasks of a router, and a service file that contains all the logic
  * Config file contains configuration data
  * Auth folder: contains logic responsible for user authorization and authentication (JWT token saved to cookie - http only + secure properties)
  * Utils: Additional functions
  * The tests folder contains tests - in progress.

## User registration and login: ##

* authorization and authentication is done using the json web token

* the password is stored in the database as a hash

* authentication takes place in the auth folder.

* Several levels of access: not logged user, registered user, admin

* The logged user can book a date for a walk with the selected dog

* Admin has access to all data contained on the website, can add new dogs with photos, check all booked dates and so on. (still in progress)


## Database: ##

* The application is built on a relational database. All data needed to properly connect to the database should be implemented as environment variables
