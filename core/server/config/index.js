module.exports = {
  env: {
    host: 'localhost',
    port: 3002,
  },
  firestoreCredentials: {
    ...require('../../firebase.json')
  },
  dataSource: {
    url: "https://h-l-m-c6c20.firebaseio.com"
  }
}