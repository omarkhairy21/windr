module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://api.windr.co',
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '30774104d50e65d95af8869c247ba6e2'),
    },
  },
});
