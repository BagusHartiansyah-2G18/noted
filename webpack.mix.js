const mix = require('laravel-mix');
require('laravel-mix-svg-sprite');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
.react()
.extract(['react'])
// .sass(
//     [
//         'resources/sass/app.scss',
//         'resources/js/style/scss/main.scss'
//     ],
//     'public/css'
// )
.sass('resources/sass/app.scss', 'public/css').options({
    processCssUrls: false
})
// .svgSprite(
//     'resources/sass/', // The directory containing your SVG files
//     'output/svg', // The output path for the sprite
//     // [loaderOptions], // Optional, see https://github.com/kisenka/svg-sprite-loader#configuration
//     // [pluginOptions] // Optional, see https://github.com/kisenka/svg-sprite-loader#configuration
// )
// .sass('resources/js/style/scss/main.scss', 'public/css')
.sourceMaps();
