const server = require('./server/server');
const config = require('./server/config')

function main() {
  server.start(config.env.port)
}

main()
