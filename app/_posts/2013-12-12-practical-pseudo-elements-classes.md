---
layout: post
title:  "Practical Applications of Pseudo Elements and Classes"
date:   2013-12-12
summary: Understanding what pseudo classes and pseudo elements are used for can be a bit confusing at first. What are they used for? Why are they pseudo?!
author: jesse
---


<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
<link rel='stylesheet' type='text/css' href='/css/pages/practical-pseudo-elements-classes.css' />

### A note about browser support:

There's some pretty crazy stuff going on in this post. The support for pseudo classes and elements
is quite good, and you can start using them in production now. The code examples in this post
show properties without vendor prefixes for readability purposes. If you're not using [Compass](http://compass-style.org/)
or [Autoprefixer](https://github.com/ai/autoprefixer) to deal with vendor prefixes,
you can always reference [Can I Use](http://caniuse.com/) to see which vendor prefixes, if any,
are required.

Understanding what pseudo classes and pseudo elements are used for can be a bit confusing at first. 
What are they? Why are they pseudo?! You're probably already familiar with a few of them. In any introductory CSS class, the `:hover` state for anchor links is a popular example.

<a href='#' class='ps-hover'>Hover Me <span> 
At nclud, we totally dig open source. All of the examples in this post are on GitHub. Click the icon below to view the Sass used.</span> </a>

<a href='https://github.com/nclud/sketchbook/blob/74a801ff6be9532e0a2bdcc2ac07caa33b51b78b/app/_scss/pages/practical-pseudo-elements-classes.scss' class='fa fa-github ps-github'>Github</a>

Here are some practical use cases for these pseudo web things:

- Pseudo Classes

  - [:active](#class__active)
  - [:checked](#class__checked)
  - [:first-child and :last-child](#class__first-last-child)
  - [:nth-child](#class__nth-child)
  - [:target](#class__target)

- Pseudo Elements

  - [:before & :after](#element__before-after)
  - [:first-letter](#element__first-letter)

## Pseudo Classes

<h3 id='class__active'>:active</h3>

The `:active` pseudo class is useful for representing skeuomorphic behavior in web interfaces.

<button class='ps-active'>Press Me</button>


I've used a button in this example and transformed the `translateY()` to offset the box shadow. It has the visual effect of the button being pressed or clicked.

{% highlight css %}

button{
  transition:all .2s ease;
  position:relative;
  box-shadow:0 10px 0 #8DC63F;
}

button:active{
  transform:translateY(9px);
  box-shadow:0 1px 0 #8DC63F;
}

{% endhighlight %}



<h3 id='class__checked'>:checked</h3>

One cool use of the `:checked` pseudo-class is custom radio buttons or checkboxes. Given the following markup:

{% highlight html %}
<label>
  <input class='ps-checked' type='radio' name='radio'>
  <div>
    Custom Radio Content
  </div>
</label>
{% endhighlight %}

We can pull off totally semantic custom radio buttons without having to use JavaScript.
Notice how the label wraps both the input and the custom radio content? Doing this
allows us to use the adjacent sibling selector. Anytime the label is clicked, the
input takes on the `checked` property. Then, we apply the styles to an div that's
adjacent to the `checked` input.

<form>
<label class='ps-checked'>
  <input type='radio' name='radio' />
  <div>
    Option 1
  </div>
</label>

<label class='ps-checked'>
  <input type='radio' name='radio' />
  <div>
    Option 2
  </div>
</label>

<label class='ps-checked'>
  <input type='radio' name='radio' />
  <div>
    Option 3
  </div>
</label>
<br style='clear:both;'>
</form>

{% highlight css %}

label input{
  visibility:hidden;
}

label div{
  box-shadow:8px 8px #8DC63F;
  position:relative;
  transition:all .2s ease;
}

label input:checked + div {
  transform:translate(7px, 7px);
  box-shadow:1px 1px 0px #8DC63F;
  color:#fff;
}

{% endhighlight %}

If we hide the radio button input with `visibility:hidden`, we are free to style
the contents of the `<label>` container as we please.

This is an elegant solution for toggle states in web applications. Instead of 
toggling a class, or worse, changing the CSS via JavaScript (jQuery included), 
we can maintain styles that reflect state changes in the DOM all in one place. 

<h3 id='class__first-last-child'>:first-child and :last-child</h3>

A popular use case for the first and last children of a container is the widget. Here's some markup:

{% highlight html %}
<div class='widget'>
  <h1>The Widget Title</h1>
  <p>A brief summary of the what The Widget Title is all about. 
     Maybe it's even the opening paragraph.</p>
  <p>Often there will be more than one paragraph in a widget</p>
</div>
{% endhighlight %}

In our widget, we want to have equal padding for the `widget` container, but ignore the margin-top of the `<h1>` and the margin-bottom of the `<p>`.
This is a common design pattern, where the container has equal spacing all around the 
elements. If the `h1` or `p` were to retain its margin when directly next to
the widget's container, it would look a bit funky.

<p data-height="450" data-theme-id="790" data-slug-hash="qzhfI" data-user="jshawl" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/jshawl/pen/qzhfI'>qzhfI</a> by Jesse Shawl (<a href='http://codepen.io/jshawl'>@jshawl</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script  src="//codepen.io/assets/embed/ei.js">&nbsp;</script>

{% highlight css %}
.widget{
  padding:1em;
}
.widget :first-child{
  margin-top:0       
}
.widget :last-child{
  margin-bottom:0
}
{% endhighlight %}

<h3 id='class__nth-child'>:nth-child</h3>

Alternating colors! It's an effective technique that takes a very small amount of code:

<ul class='ps-nth-child'>
  <li>Item One</li>
  <li>Item Two</li>
  <li>Item Three</li>
  <li>Item Four</li>
  <li>Item Five</li>
</ul>

{% highlight css %}
li:nth-child(2n){
  background:#8DC63F;
}
{% endhighlight %}

Before `:nth-child` was available, you'd have to either hardcode classes into
the alternating rows or use a JavaScript solution to color the odd-numbered rows.
Using a CSS solution allows us to keep styles together, which ultimately decouples
our front end code.

<h3 id='class__target'>:target</h3>

The `:target` pseudo class is useful for highlighting hash-linked sections 
on web pages. This is a great usability technique. Normally the page will jump
to the anchor on click and position the element with the corresponding ID at the
top of the page. If the linked-to element is towards the bottom of the page, and there
isn't enough room at the bottom for the element to be all the way at the top of the
page, the only way to identify what was linked to will be to use the `:target` 
pseudo class to highlight the important info.

<p id='this-link' class=''>
  Clicking on <a href='#this-link'>this link</a> will make the window jump to the anchor, and will highlight the 
linked-to line.
</p>
                                 

{% highlight css %}
:target{
  animation:target 2s ease;
}

@keyframes target{
  0%{
    background:#B4D88B;
  }
  100%{
    background:#fff;;
  }
}

{% endhighlight %}

Here are some other examples of using the `:target` pseudo selector:

1. [A List Apart](http://alistapart.com/article/offline-first#section2)
2. [Stack Overflow](http://stackoverflow.com/questions/20496117/overlapping-and-centering-divs-in-html-css/20496298#20496298)

### The difference between pseudo-classes and pseudo-elements

When both use the `:` syntax to denote pseudo-ness, it's difficult to remember
the difference between a class and an element. The CSS3 spec provides a syntax
for distinguishing between pseudo classes and pseudo elements: `:class` and `::element`.
 
Pseudo classes are used to select elements which cannot be selected
using a class or id. I like to think of pseudo elements
as being able to add content to a node in the DOM without
adding more markup, like all the cool things on [one-div.com](http://one-div.com/).

Most of the examples in this post reference pseudo classes, but Chris Coyier
has a great round up of all the cool things you can do with pseudo elements over
at [CSS Tricks](http://css-tricks.com/pseudo-element-roundup/).

<h3 id='element__before-after'>:before and :after</h3>

My most frequent use of the `:before` pseudo element is the micro clearfix. In Sass,
you can extend a clearfix place holder:

Micro Clearfix adapted from [Nicholas Gallagher](http://nicolasgallagher.com/micro-clearfix-hack/).

{% highlight scss %}
%clearfix{
  :after{
    content: ' ';
    display: table;
    clear: both;
  }
}
{% endhighlight %}

<h3 id='element__first-letter'>:first-letter</h3>

There's no need to use images or hard code div's with a class if you
want to pull off the drop cap technique:

<p class='ps-first-letter'>Jesse Shawl is a Front End Developer at nclud - whose focus intersects web performance and cutting edge browser interactivity. He's an open source advocate who enjoys building tools for the web with third party API's and mesmerizing CSS animations.</p>

{% highlight css %}
p:first-letter{
  font-size: 5em;
  height: .75em;
  display: block;
  float: left;
  padding-right:.125em;
  line-height: 1;
  font-weight:bold;
  color:#B4D88B;
  text-shadow:4px 4px 0 #8DC63F;
}
{% endhighlight %}


