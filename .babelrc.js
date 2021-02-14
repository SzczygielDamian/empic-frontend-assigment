module.exports = {
    presets: [
        [
            '@babel/preset-react'
        ],
        [
            '@babel/preset-env',
                {
                targets: {
                    esmodules: true,
                    },
                },
        ],
        '@babel/preset-typescript',
    ],
};