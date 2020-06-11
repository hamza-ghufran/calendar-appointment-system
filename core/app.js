const mongoose = require("mongoose");
const server = require('./server/server');
const config = require('./server/config/config');

function main() {
  const uri = `${config.mongoDB.name}://${config.mongoDB.host}:${config.mongoDB.port}/${config.mongoDB.database}`
  const port = config.env.port

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
  })

  mongoose.connection.on("connected", function () {
    console.log("Connected to " + uri + " DB!");

    server.start(port)
  });
}

main()
