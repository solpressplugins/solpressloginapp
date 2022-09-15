
 import mongoose from "mongoose";

const CONN_DISCONNECTED = 0,
  CONN_DISCONNECTING = 3;
// CONN_CONNECTED = 1;

const Database = {
  /**
   * Open a db connection
   * @method open
   * @param onSuccess {Function}
   * @param onError {Function}
   * */

  open() {
    return new Promise((resolve, reject) => {
      //Do not attempt to open an already opened database
      if (
        mongoose.connection === undefined ||
        mongoose.connection.readyState === CONN_DISCONNECTED ||
        mongoose.connection.readyState === CONN_DISCONNECTING
      ) {
        const db = mongoose.connection;

        const MONGODB_URI = process.env.MONGODB_URI;
        // Create the database connection
        mongoose.connect(MONGODB_URI || "mongodb://localhost/SolanaDB", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        // CONNECTION EVENTS
        // When successfully connected
        db.on("connected", () => {
          console.log(`Mongoose default connection open to ${MONGODB_URI ? 'MONGODB_URI' : 'default uri'}`);
          resolve(mongoose);
        });

        // If the connection throws an error
        db.on("error", (err) => {
          console.log(`Mongoose default connection error: ${err}`);
          reject(err);
        });
        // When the connection is disconnected
        db.on("disconnected", () => {
          console.log("Mongoose default connection disconnected");
        });
        // If the Node process ends, close the Mongoose connection
        process.on("SIGINT", () => {
          db.close(() => {
            console.log(
              "Mongoose default connection disconnected through app termination"
            );
            process.exit(0);
          });
        });
      } else {
        resolve();
      }
    });
  },

  //Expose this instance of mongoose so that it can be used when needed
  mongoose,

  close() {
    mongoose.disconnect();
  },
};
module.exports = Database;
