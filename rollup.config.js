import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import uglify from 'rollup-plugin-uglify'
import html from 'rollup-plugin-bundle-html';
import globals from 'rollup-plugin-node-globals'

const dev = 'development';
const prod = 'production';
const env = (process.env.NODE_ENV === prod || process.env.NODE_ENV === dev) ? process.env.NODE_ENV : dev;

const plugins = [
    replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
    resolve(),
    typescript(),
    commonjs({
        // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
        include: 'node_modules/**',
        namedExports: {
            // The commonjs plugin can't figure out the exports of some modules, so if rollup gives warnings like:
            // ⚠️   'render' is not exported by 'node_modules/react-dom/index.js'
            // Just add the mentioned file / export here
            'node_modules/react-dom/index.js': [
                'render',
            ],
            'node_modules/react/index.js': [
                'Component',
                'PropTypes',
                'createElement',
            ],
        },
    }),
    globals(),
    html({
        template: './index.html',
        dest: 'dist',
        filename: 'index.html'
    }),
    postcss({
        extract: true,
        sourcemap: true
    })
]

if (env === dev) {
    // For playing around with just frontend code the serve plugin is pretty nice.
    // We removed it when we started doing actual backend work.
    plugins.push(serve({
        port: 8083,
        historyApiFallback: true,
        open: true,
        openPage: '/index.html',
        contentBase: ['dist']
    }));
    // plugins.push(livereload());
}

if (env === prod) {
    plugins.push(uglify());
}
export default {
    plugins,
    external: [{
        react: 'React'
    }],
    input: './src/index.ts',
    output: {
        name: 'bundle.js',
        file: './dist/bundle.js',
        format: 'iife'
    },
}