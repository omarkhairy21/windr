module.exports = ({ env }) => {
  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'postgres',
          host: `/cloudsql/${env('INSTANCE_CONNECTION_NAME')}`,
          database: env('DATABASE_NAME'),
          username: env('DATABASE_USERNAME'),
          password: env('DATABASE_PASSWORD'),
        },
        options: {
          debug: env.bool('ENABLE_DATABASE_LOGS'),
          pool: {
            min: env('DATABASE_MIN_CONNECTIONS', 2),
          },
        },
      },
    },
  }
};

