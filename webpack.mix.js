let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

//mix.js('src/app.js', 'dist/').sass('src/app.scss', 'dist/');

//copy fonts
mix.copy('node_modules/font-awesome/fonts','public/fonts/vendor/font-awesome');
mix.copy('node_modules/bootstrap-sass/assets/fonts/bootstrap', 'public/fonts/vendor/bootstrap');
//copy vendor scripts
mix.copy('node_modules/jquery/dist/jquery.min.js', 'public/js/vendor/jquery.min.js');
//copy laydate
mix.copy('node_modules/layui-laydate/dist/theme', 'public/js/theme');

mix.options({ processCssUrls: false }).js('resources/assets/js/index.js', 'public/js/').sass('resources/assets/scss/index.scss', 'public/css/');
mix.options({ processCssUrls: false }).js('resources/assets/js/login.js', 'public/js/').sass('resources/assets/scss/login.scss', 'public/css/');
