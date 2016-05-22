To run locally: 

  1. Clone this repository: [git clone https://github.com/sjstone2838/bmbase.git]
  2. Add config.js, containing SolveBio access token, to directory
  3. In the new directory, start a local server, for example: [python -m SimpleHTTPServer]
  4. Open your browser to localhost:8000 or whatever port is designated in your local settings 

To push local changes into production
  1. Before making changes, run [grunt watch] in local directory. Any time a controller or service .js file is saved, Grunt will overwrite the dist/bmbase.min.js, which is the only JS dependency in index.html. The file dist/bmbase.min.js is a minified, concatenated version of all .js files in the /controllers and /services directories. 
  2. [grunt] default includes [grunt jshint] (js linting, aka error checking) and [grunt uglify] (minification and concatenation of .js files)
  
