const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const {Nuxt, Builder} = require("nuxt");

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;
const app = new express();
app.use(cookieParser());
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: {secure: true}
    })
);

let config = require("./nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");
const nuxt = new Nuxt(config);
// Build only in dev mode
if (config.dev) {
    const builder = new Builder(nuxt);
    builder.build();
    process.env.dev = true;
} else {
    process.env.dev = false;
}
//#region APP Start
app.use(nuxt.render);

// Listen the server
app.listen(port, host, () => {
    console.log("Server listening on " + host + ":" + port); // eslint-disable-line no-console
});
