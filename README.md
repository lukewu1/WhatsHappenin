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
* Tailwind
* Express.js
* Handlebars.js
* Docker
* Mocha
* Chai
* Axios

## Prerequisites to Run Application
* Standard web browser

To run locally:
* Create .env file within ProjectSourceCode folder with API keys
* Google Maps API key
* SerpApi API key

## Instructions To Run the Application Locally 
To run the app locally, ensure you have docker correctly installed.
1. Ensure you are in the directory of root code `WhatsHappenin/ProjectSourceCode`
2. Run the terminal command: ```docker compose down -v``` to ensure that no existing volumes exist, which could interfere with test cases
2. Run the terminal command: ```docker compose up```
3. You can now visit the application at: http://localhost:3000/login

To shut down the application:
1. Run the terminal command: `docker compose down` or `docker compose down -v` (if you want to also remove the related volumes)


## How to Run Tests
> By default the test cases run everytime ```docker compose up``` is ran.

To **not** run tests:
1. Go to the docker-compose.yaml file in ./ProjectSourceCode
2. Under ```command:``` change ```npm run testandrun``` to ```npm start```
3. Now follow the same instructions to run the application locally

To return back to running the tests:
1. Go to the docker-compose.yaml file in ./ProjectSourceCode
2. Under ```command:``` change ```npm start``` to ```npm run testandrun```
3. Now follow the same instructions to run the application locally 

## Link to Deployed Application:
https://whatshappenin.onrender.com