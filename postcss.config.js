module.exports = {
    use: ["postcss-import", "precss", "postcss-pxtorem", "autoprefixer", "css-mqpacker", "cssnano"],
    input: "./styles/index.css",
    output: "./styles/bundle.css",
    "postcss-import": {
        onImport: function(sources) {
            global.watchCSS(sources);
        }
    },
    map: {
        inline: false
    },
    autoprefixer: {
        browsers: "last 2 versions"
    },
    "postcss-pxtorem": {
        prop_white_list: [],
        media_query: true
    },
    "css-mqpacker": {
        sort: true
    },
    cssnano: {
        discardComments: {
            removeAll: true
        }
    }
};
