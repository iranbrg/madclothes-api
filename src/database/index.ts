import { createConnection } from "typeorm";

// TODO: only start the server after the database is successfully connected
createConnection()
    .then(() => console.log("Succesfully connected to the database"))
    .catch(err => { throw err });
