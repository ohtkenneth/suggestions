const env = process.env.NODE_ENV || 'dev';

const config = {
  dev: {
    server: {
      host: process.env.DEV_SERVER_HOST || 'localhost',
      port: process.env.DEV_SERVER_PORT || 3000,
    },
    db: {
      host: process.env.DEV_DB_TEST || 'localhost',
      port: process.env.DEV_DB_PORT || 27017,
    }
  },
  test: {

  },
  prod: {

  }
}

module.exports = config[env];