module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'dd2b6f0ca5a0498b1230d7431a32492d'),
  },
});
