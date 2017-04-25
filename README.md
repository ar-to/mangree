# Mangree

#### A custom css framework created for convenience and availability of javascript effects. It is responsive, easy to use and fun to implement.

Mangree provides the following tools to help developers create website that are reponsive and cross-browser capable.

- [Boilerplate](https://github.com/ar-to/boilerplate): a custom boilerplate template used in the development of Mangree
- Modernizr
- Normalize.css -not added yet

#### Table of Contents


1. [Download Files](#download-files)
2. [Setup Grid](#setup-grid)
3. [Setup Nav](#setup-nav)
4. [Adding Effects](#adding-effects)
5. [Debugging](#debugging)
6. [How to Contribute](#how-to-contribute)
7. [Development Known Issues](#dev-known-issues)

## Download Files

##### Files inside [dist](https://github.com/ar-to/mangree/tree/master/dist) are needed to use this framework

```html
<!--inside <head> tag -->
<link rel="stylesheet" type="text/css" href="css/main.css">
<!--before </body> tag -->
<!--<script src="jquery url"></script> -->
<script src="js/main-build.js"></script>
```

Don't forget to add your JQuery script before main-build.js for scripts dependent on JQuery to work.

## Setup Grid

##### Begin by defining the containers

```html
<div class="section">
  <div class="row">
    <div class="col smtab-12">
      <p>ff</p>
    </div>
  </div>
</div>
```

Columns are separated by mobile, small tablet, tablet, and laptop. Use the following classes for each column you want to fit a screen or use mobile class to have your column be the same throughout all screen sizes.Columns should sum up to 12. For example, a row should have mob-2 and mob-10 to equal 12.

```css
.col /*used to setup column*/
.mob-# /*for screens < 524px (e.g.mob-2 is 2 of 12)*/
.smtab-# /*screens < 768px */
.tab-# /*screens < 960px */
.lap-# /*screens > 960px */
```

Download sample [test site](https://github.com/ar-to/mangree/tree/master/dist/test) to see how they work.

## Setup Nav

##### Start with one of the following snippets

A fixed nav bar

```html
<nav class="nav fixed-nav-bar">
        <div class="section">
            <a href="http://placehold.it">
                <div id="logo" class="logo"></div>
            </a>
            <nav id="nav">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#code">About</a></li>
                    <li><a href="#">Contact</a></li>

                </ul>
                <ul class="ft-right">
                    <li><a href="#">Log In</a></li>
                    <li><a href="#">Log Out</a></li>
                </ul>
            </nav>
        </div>
    </nav>
    <div id="top" class="fixed-nav-mar"></div>
    <div class="section fixed-nav-pad">
```

class `fixed-nav-mar` adds a margin below the nav since a fixed bar will float above the rest of the elements. `fixed-nav-pad` adds a top padding to the first section element so it is not overlapped by the nav bar. 

For a non-fixed nav bar

```html
<div class="nav">
        <div class="section" id="top">
            <div class="row">
                <a href="http://placehold.it">
                    <div id="logo" class="logo"></div>
                </a>
                <nav id="nav">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#code">About</a></li>
                        <li><a href="#">Contact</a></li>

                    </ul>
                    <ul class="ft-right">
                        <li><a href="#">Log In</a></li>
                        <li><a href="#">Log Out</a></li>
                    </ul>
                </nav>
            </div>
            <!--end row-->
        </div>
        <!--end section-->
    </div>
    <!--end nav-->
```

## Adding Effects

Effects in Mangree take on the role of adding UI/EX functionality via Javascript and Javascript libraries such as JQuery. Mangree does bundle JQuery within the main bundle.js file, so you need to link the JQuery library separately but before the bundle.js to allow the DOM to load your scripts in order and avoid breaks in functionality.

```html
<!--use most recent jquery library by going to http://jquery.com-->
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
```

Below are the effects supported by the current version of Mangree.

**Navigation Shrink** 

Shrink the nav bar on scroll by adding `shrink` class to a container using the `nav` class.

```html
<nav class="nav fixed-nav-bar shrink clr-change">
<!--mangree add-->

```

**Logo Shrink**

Shrink the logo by adding the `shrink` class to a container with the `logo` class.

```html
<div class="logo shrink"></div>
```





## Debugging

Mangree comes with [sourcemaps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map) built into the javascript and css files for easier debugging and styling through browser developer tools. 

## How to Contribute

#### Things to review before contributing

1. RequireJS and its optimization tool rjs, specially the [options](https://github.com/requirejs/r.js/blob/master/build/example.build.js) for rjs.
2. Using Gulp for facilitating and automizing tasks; when running a watch command you need to save the main .pug file for the compile to run and update the html. Saving (_)patials.pug files will not automatically update the compile html file.
3. Using PugJS for making html templates
4. Using Sass for compiling and writing css faster
5. Understand how [globs](http://mywiki.wooledge.org/glob) work for use in Gulp and Javascript directories
6. Basic knowledge of regex (regular expressions) in Javascript to understand string searching.
7. Know how to use npm (node package manager) to install modules and have NodeJS installed.

#### Specific things to know

#####RequireJS
There are three main files for running and updating requirejs:
- src/js/require.config.js - main file to load modules and run logic
- tools/rjs.build.js - run optimization r.js tool using CLI;must be in tools folder
- gulpfile.js. - contains gulp tasks for running and optimizing scripts into dist/js/mangree.js

Some of the reasons behind having different files is because one runs for requireJS specifically, the other for optimizing, and then there is the gulp file which really just runs the optimizer. An important note to keep in mind is that the optimizer uses almond.js as the AMD source over the default require.js mostly due to size.

#### Download, Change , Push

Clone repo
```bash
git clone https://github.com/ar-to/mangree.git
```

Create a new branch

```bash
git checkout -b branchname
```

Run npm and bower install command to install all dependancies from json files.

```bash
bower install
npm install
```

Make changes, then commit them to your branch and push them to this remote repo

```bash
git add .
git commit -m 'message'
git push origin branchname
```

In GitHub navigate to your branch and click Pull Request. Write your notes regarding what changes you made and why you think they need to be merged to the master repo. Press submit and your request will be reviewed. Any changes to your request will be annotated on it before a final merge can occur.

#### Making changes

There are various way to about and manipulating the current files into what you want to do and later wish to share and hopefully get merged with master on GitHub. Below are the main tools used in creating Mangree so its recommended to use these tools in development to avoid production problems. 

- PugJS
- Sass
- RequireJS
	- almond.js
	- r.js
- Bower
- NodeJS/NPM
- Gulp
- Modernizr
- Normalize.css

Most of these tools have global CLI (command line interface) installations allowing you to run commands from your shell. Some are ruby gems, others are node packages, so it is up to you whether using global commands is good for your workflow. Mangree does come with alternatives for certain tools such as gulp and modernizr that makes them development dependancies and not required globally. It uses npm scripts to use npm as a build tool similar to gulp. After running `npm install` run the following:

```bash
$ npm run watch
#this is the same as running $ gulp watch which is a task inside the gulpfile.js
#that runs and watches pugjs, sass, and requirejs changes and recompiles all
$ npm run modernizr
#return a new modernizr.js build based on the modernizr.config.json into the 
#designated directory inside the package.json scripts object
```
This is a convenient alternative to installing global packages and risk getting version errors for not using what what was used in developing Mangree.

## Dev Known Issues

1. RequireJS script (require.config.js) used to load modules with require.js package does not seem to work. It seems to take the directory from where the .html is and not where it is made to go:
```markup
script(src='../../bower_components/requirejs/require.js' data-main='../../src/js/require.config.js')
```
The solution used was to compile the requirejs modules into the single file version and add it as a script to the working .html file.
```markup
  <script src="../js/bundle.js"></script>
    <!--script(src='../../bower_components/requirejs/require.js' data-main='../../src/js/require.config.js')-->
```
2. When removing/adding new scripts as modules or "browser global" such as JQuery, you need to add it to three separate files src/js/require.config.js, tools/rjs.build.js, and gulpfile.js. Reason is I could get it to run r.js and optimize into a single file without getting errors.
