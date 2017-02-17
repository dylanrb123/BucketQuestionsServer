# BucketQuestionsServer
Server for Bucket Questions game

## Running the server
Prerequisites: latest versions of node.js and npm installed.

Note: must have file at root called `db_credentials.json` containing the credentials for the db user. The format is:

    {
      "name": <db_name>,
      "user": <user_name>,
      "pass": <password>
    }

Run the following from the root directory to start the server locally:
`npm install`
`npm start`

The server is now running at `localhost:8080`