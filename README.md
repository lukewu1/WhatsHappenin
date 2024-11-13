# WhatsHappenin - Team 2
CSCI 3308 Section 12 Team 2 Project

## Brief Application Description
Curious about what's happening in the world? Our application allows users to drop pins around the world to tell them the local news at that specific location. WhatsHappenin brings the news to you based on your location of interest whether out of research for a particular area or out of simple curiosity.

## Contributors
* Aidan Donnelly
* Alicia Zhang
* Eric David
* Kenneth Flowe
* Luke Wu

## Technology Stack
* HTML
* PostgreSQL
* JavaScript
* SQL
* Node.js
* Bootstrap
* Express.js
* Handlebars.js
* Docker

## Prerequisites to Run Application
* Standard web browser
* Create .env file within ProjectSourceCode folder with the following information:
```
# database credentials
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="pwd"
POSTGRES_DB="users_db"

# Node vars
# 8UxAzXCpKYT37qiX
SESSION_SECRET="super duper secret!"
API_KEY="oT0nOfiGSQSGFvi6EhvvPsGZdhJL6hW3"

MAP_API_KEY="AIzaSyCQhN3dEoNTh4X7wdWuWz8EU__DZX6n3RQ"
NEWS_API_KEY="b68e4ec28f5f271410a7f3dbef56886202dd6e372374a87c8d93cc65e2f0f4e5"
```

## Instructions To Run the Application Locally 
To run the app locally, ensure you have docker correctly installed.
1. Ensure you are in the directory of root code `WhatsHappenin/ProjectSourceCode`
2. Run the terminal command: ```docker compose up```
3. You can now visit the application at: http://localhost:3000/login

To shut down the application:
1. Run the terminal command: `docker compose down` or `docker compose down -v` (if you want to also remove the related volumes)


## How to Run Tests

## Link to Deployed Application: