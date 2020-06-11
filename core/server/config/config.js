module.exports = {
  env: {
    host: 'localhost',
    port: 3002,
  },
  mongoDB: {
    port: "27017",
    name: "mongodb",
    host: "localhost",
    database: "hlm",
    connector: "mongoose",
    useNewUrlParser: true
  },
}