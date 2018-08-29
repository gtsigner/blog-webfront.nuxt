module.exports = {
    apps: [
        {
            name: "front.fit.fitoneapp.com",
            script: "./app.js",
            env: {
                NODE_ENV: "development",
                API_BASE: "http://127.0.0.1:7001/api/v1",
                PORT: 3000
            },
            env_production: {
                NODE_ENV: "production",
                API_BASE: "https://blog.oeynet.com/api/v1",
                PORT: 3000
            }
        }
    ]
};
