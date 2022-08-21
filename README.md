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
  * Database operations using typeORM

## User registration and login: ##

* authorization and authentication is done using the json web token

* the password is stored in the database as a hash

* authentication takes place in the auth folder.

* Several levels of access: not logged user, registered user, admin

* The logged user can book a date for a walk with the selected dog

* Admin has access to all data contained on the website, can add new dogs with photos, check all booked dates and so on. (still in progress)


## Database: ##

* The application is built on a relational database. All data needed to properly connect to the database should be implemented as environment variables
<h1>Codes examples</h1>
<hr>
<p>User authorization service.</p>
<img src="https://user-images.githubusercontent.com/89840843/185795505-a423da66-f383-4dcd-946e-be75238ac8bc.png"><hr>

<p>Database connection settings.</p>
<img src="https://user-images.githubusercontent.com/89840843/185795603-46acaca6-d47c-4c2b-97d6-5e4ac99d6de3.png"><hr>

<p>Guard - check if user has admin role. If note - endpoints with this guard are blocked.</p>
<img src="https://user-images.githubusercontent.com/89840843/185795652-5916bdb5-3dda-49ff-bdc6-3d293f690aeb.png"><hr>

<p>DTO by register new user</p>
<img src="https://user-images.githubusercontent.com/89840843/185795670-abb6649c-4c40-4721-9954-eafbdb70a602.png"><hr>

<p>User service - example on add new user function</p>
<img src="https://user-images.githubusercontent.com/89840843/185795715-e06897fc-eb65-4df8-bc4e-d229dbe999ad.png"><hr>

<p>Entity with user table - SQL Database</p>
<img src="https://user-images.githubusercontent.com/89840843/185795759-cae70717-a7da-48bb-aa07-603c84bc4545.png"><hr>
<h2>Status</h2>
<p>In progress</p>
<h2>Setup</h2>
<ul>
<li>use git clone https://github.com/eLPog/DogTaker</li>
<li>run your sql server locally and add own database</li>
<li>set your settings with environment variables</li>
<li>run app with npm start - all database tables will be created automatically</li>
</ul>
