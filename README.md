# Mangree

#### A custom framework created for convenience and availability of javascript effects. It is responsive, easy to use and fun to implement.

## Setup Grid

##### Begin by defining the containers

```markup
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

## How to setup Nav

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




