require('dotenv').config({ path: 'variables.env' });

const cors = require('cors')
const app = require('express')()
const bodyParser = require("body-parser");

const slotRoutes = require('./routes/slot')
const eventRoutes = require('./routes/event')

function init() {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors())

  //Open Routes
  app.use("/event", eventRoutes);
  app.use("/slot", slotRoutes);
};

module.exports.start = function (port) {
  init()

  app.listen(port, () => {
    console.log("Server is running on port " + port + "...");
  })
}

