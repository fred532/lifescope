var fs = require("fs");
const MarkdownIt = require("markdown-it");
const MarkdownItOEmbed = require("markdown-it-oembed");
const MarkdownItTitle = require("markdown-it-title");

module.exports = async (file_path) => {
    const content = await fs.promises.readFile(file_path, "utf-8");

    const md = new MarkdownIt({
        linkify: true,
        breaks: false,
    });
    md.use(MarkdownItTitle);
    md.use(MarkdownItOEmbed);

    let env = {};
    let render = await md.renderAsync(content, env);

    return { render, env };
};
