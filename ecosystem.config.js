module.exports = {
  apps: [
    {
      name: "front.fit.fitoneapp.com",
      script: "./app.js",
      env: {
        NODE_ENV: "development",
        EGG_API_URI: "http://127.0.0.1:7001/api/",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        EGG_API_URI: "https://blog.oeynet.com/api/",
        PORT: 3000
      }
    }
  ]
};
