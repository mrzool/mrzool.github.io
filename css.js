var fs = require("fs")
var autoprefixer = require("autoprefixer")
var postcss = require("postcss")
var atImport = require("postcss-import")
var cssvariables = require('postcss-css-variables')
var compressor = require('node-minify')
var conditionals = require('postcss-conditionals')
var customMedia = require("postcss-custom-media")

var css = fs.readFileSync("src/s.css", "utf8")

var output = postcss([autoprefixer])
  .use(atImport())
  .use(cssvariables())
  .use(conditionals())
  .use(customMedia())
  .process(css, {
    from: "./src/s.css",
    to: "./css/s.css"
  })
  .css

fs.writeFile("css/s.css", output, 'utf-8')

// Using Sqwish for CSS
// new compressor.minify({
//     type: 'sqwish',
//     fileIn: './css/mnml.css',
//     fileOut: './css/mnml.min.css'
// });
