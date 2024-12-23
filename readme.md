# CRM PROGRAMMING SCHOOL

This is a full-stack project that allows managing student applications and inquiries.

The backend is built with Node.js, Express, and a MongoDB database (using Mongoose).
The frontend is developed with React.

## Installation and Launch Instructions

Install Docker and Docker Compose

Before launching the project, make sure you have Docker and Docker Compose installed on your machine.
•	Install Docker: https://docs.docker.com/get-docker/
•	Install Docker Compose: https://docs.docker.com/compose/install/

1. Clone the repository:
    ```bash
    git clone https://githubcom/anton-moskalenko-kh/crm-programming-school.git
    ```

2. Install all necessary dependencies:
    ```bash
    npm install
    ```

3. Create `.env` file in the root directory. Necessary variables for project you will find in .env example file. Replace data in empty variables for your own or contact with me.
   

4. Open the Docker Compose file and for the app container replace <PORT> with the port number you specified in the .env configuration file.
 ports: "8888:Your PORT" 


5. Navigate to the project root directory::
    ```bash
    cd CRM Programming School
    ```
6. Build and launch the project using Docker Compose:
   ```bash
    docker-compose up --build
    ```
7. After the build is complete, the project will be available at:
   ```bash
    http://localhost:8888
    ```


## Usage

In order to see and test all available endpoints you can use Swagger running at http://localhost:8888/api/docs or Postman Collection (import file CRM Programming School.postman_collection.json from root directory to your Postman application)
 





