module.exports = ({ env }) => {
  console.log(env)
  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'postgres',
          host: env('RDS_HOSTNAME', '127.0.0.1'),
          port: env.int('RDS_PORT', 5432),
          database: env('RDS_DB_NAME', 'windr'),
          username: env('RDS_USERNAME', ''),
          password: env('RDS_PASSWORD', ''),
        },
        options: {
          debug: true, //env.bool('ENABLE_DATABASE_LOGS'),
          pool: {
            min: 1,
          },
          ssl: false,
        },
      },
    },
  }
};

