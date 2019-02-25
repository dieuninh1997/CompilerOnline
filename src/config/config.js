if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const config = {
  dev: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '12345678',
      database: process.env.DB_DATABASE || 'compiler_online'
    }
  },
  product: {
    client: 'mysql',
    connection: {
      host: 'us-cdbr-iron-east-03.cleardb.net',
      user: 'b1bb7fa5c67f98',
      password: '5751a765',
      database: 'heroku_196001fc5bcd2d1'
    }
  },
  isDev: !!process.env.DEV
}
module.exports = config
