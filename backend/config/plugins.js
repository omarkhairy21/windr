module.exports = ({ env }) => ({
  upload: {
    provider: 'google-cloud-storage',
    providerOptions: {
      serviceAccount: env.json('GCS_SERVICE_ACCOUNT'),
      bucketName: env('STORAGE_BUCKET_NAME'),
      publicFiles: true,
      uniform: false,
    }
  },
});
