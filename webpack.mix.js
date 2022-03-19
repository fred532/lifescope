const config = require("./config");

const TestExport = require("./src/telescope/test");
const testExport = new TestExport();
testExport.generate();

let mix = require("laravel-mix");
mix.setPublicPath(config.folders.dist);
mix.setResourceRoot(".");
mix.options({
    legacyNodePolyfills: false,
});

//mix.sass("src/scss/app.scss", "");
mix.copy("src/static", `${config.folders.dist}/static`);
mix.copy("src/css", `${config.folders.dist}/css`);
mix.disableNotifications();
