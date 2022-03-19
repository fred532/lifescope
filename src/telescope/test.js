const config = require("../../config");

const seedrandom = require("seedrandom");
seedrandom(config.seed, { global: true });

const fs = require("fs");
const Twig = require("twig");
const parseMarkdown = require("./parse_markdown");
const getID = require("./ids");
const { minify } = require("html-minifier");

module.exports = class TestExport {
    files_to_render = [];

    constructor() {
        this.timestamp = Date.now();
    }

    // creation des dossiers dist depuis config.js
    init_folder() {
        //suppression
        if (fs.existsSync(config.folders.dist)) {
            fs.rmSync(config.folders.dist, { recursive: true });
        }
        fs.mkdirSync(config.folders.dist);
    }

    async generate() {
        this.init_folder();

        // save index.html
        let main_data = await parseMarkdown(`${config.folders.data}/life.md`);

        Twig.renderFile(
            "./src/template.twig",
            {
                config: config,
                timestamp: this.timestamp,
                content: main_data.render,
            },
            (err, html) => {
                html = minify(html, {
                    collapseWhitespace: true,
                });

                fs.writeFile(
                    `${config.folders.dist}/index.html`,
                    html,
                    function (err) {
                        if (err) return console.log(err);
                    }
                );
            }
        );
    }
};
