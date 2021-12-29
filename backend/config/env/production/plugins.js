module.exports = ({ env }) => ({
  upload: {
    provider: 'google-cloud-storage',
    providerOptions: { 
      bucketName: env('STORAGE_BUCKET_NAME'),
      publicFiles: true,
      uniform: false,
    }
  },
});
