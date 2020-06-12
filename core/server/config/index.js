module.exports = {
  env: {
    host: 'localhost',
    port: 3002,
  },
  firestoreCredentials: {
    type: process.env.TYPE,
    private_key: process.env.KEY,
    auth_uri: process.env.AUTH_URI,
    client_id: process.env.CLIENT_ID,
    token_uri: process.env.TOKEN_URI,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.KEY_ID,
    client_email: process.env.CLIENT_EMAIL,
    client_x509_cert_url: process.env.CLIENT_CERT,
    auth_provider_x509_cert_url: process.env.AUTH_CERT,
  },
  dataSource: {
    url: "https://h-l-m-c6c20.firebaseio.com"
  }
}