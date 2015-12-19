---
layout: post
title: Typesetting automation
subtitle: A plain-text workflow for painless production of personal documents & offline correspondence&mdash;featuring Pandoc, <span class="latex">L<sup>a</sup>T<sub>e</sub>X</span>, and a simple makefile
preview: "http://github.com/mrzool/letter-boilerplate/raw/master/preview.jpg"
GistID: 60ebd0955e6e64b8205c
---

<span class="newthought">I've become pretty obsessed</span> with typesetting automation lately. Being a freelancer, I need to write letters, contracts and invoices on a regular basis. I wasn't happy with the standard solution of using graphical (and proprietary) software like MS Word or InDesign to do this. I know this is the common choice for most people out there, but for someone used to work with incredibly fast and powerful text manipulation tools like Vim and the Unix shell, pointing-and-clicking and option-hunting in a bloated GUI environment weren't really cutting it.

I wanted a system that allowed me to produce perfectly typeset documents in an automated fashion. Also, I wanted to be able to do this by using only plain text files, my text editor, and lean, open source CLI utilities. And also, I wanted a simple, smooth and portable workflow with minimal overhead (i.e. no complicated setup and as little dependencies as possible).

The project [tex-boilerplates](http://mrzool.cc/tex-boilerplates/) is the result of my effort. At its core there's a simple system that provides you with a basic skeleton for painless and automated typesetting of three common types of documents: [letters](https://github.com/mrzool/letter-boilerplate), [invoices](https://github.com/mrzool/invoice-boilerplate) and [CVs/résumés](https://github.com/mrzool/cv-boilerplate).

The three boilerplates have the same structure and work in a very similar way.
They all live on Github and provide a `README` that explains in detail dependencies, installation and usage, so refer to that to learn about the individual differences.

For this article, I've picked [letter-boilerplate](https://github.com/mrzool/letter-boilerplate) to walk you through a typical workflow. Let's look at the basic structure of the repository:

{% highlight bash %}
├── README.md
├── letter.md
├── details.yml
├── template.tex
└── makefile
{% endhighlight %}

Here's what every file is about:

1. **`README.md`**: Info on dependencies, installation, and usage.
2. **`details.yml`**: A YAML file for content and metadata.
3. **`letter.md`**: A markdown file to write the actual letter.
4. **`template.tex`**: A simple <span class="latex">L<sup>a</sup>T<sub>e</sub>X</span> template that deals with style, layout and typography.
5. A **`makefile`** containing the Pandoc command that creates the PDF.

*Edit: I've recently [merged](https://github.com/mrzool/letter-boilerplate/commit/4390e501534270a10d6f38efda4fdf1cb1575004) `details.yml` into `letter.md` to make things simpler. Now, the YAML metadata block is embedded in the first few lines of `letter.md` instead of living in a dedicated file. Everything else stayed the same, so read on.*

## A typical workflow

Let's say I need to write a letter. This could be a job application letter, a legal statement for my lawyer, or a pitch for a client.

First, I clone the [letter-boilerplate](https://github.com/mrzool/letter-boilerplate)'s repository to my machine, move into it and get rid of the `.git` folder with this one-liner:

{% highlight bash %}
git clone https://github.com/mrzool/letter-boilerplate.git my-letter && my-letter && rm -rf .git/
{% endhighlight %}

Next, I copy a PDF scan of my signature (that I created using [this method](http://tex.stackexchange.com/questions/32911/adding-a-signature-on-an-online-job-application/32940#32940) and I conveniently keep in my Dropbox) and paste it in the current directory:

{% highlight bash %}
cp ~/Dropbox/signature.pdf .
{% endhighlight %}

That's it. I'm all set. Now I can open `letter.md` in Vim and write my letter in markdown (let's pretend that it's 1867 and I'm Friedrich Nietzsche writing to his pen pal Carl Freiherr von Gersdorff):

    Dear Friend,

    I am a bombardier in the second mounted division
    of the Fourth Horse Artillery.

    [...]

    Your devoted friend,

When I'm done writing to my friend Carl, all there's left to do is to edit `details.yml` with names and addresses, taking care of preserving the already present data structure:

{% highlight ruby %}
# Letter's details
author: F. Nietzsche
city: Naumburg
from:
- Artillerieregiment, 8. Batt.
- Nordstraße 15, Naumburg
to:
- Carl Freiherr von Gersdorff
- Stresow-Kaserne I
- Grenadierstraße 13–16
- 13597 Spandau
{% endhighlight %}

For your reference, this is the part of `template.tex` where I grab the data above:

{% highlight latex %}
% Where I print my name and address
\small
\textsc{\textbf{$author$}}
$for(from)$
\textbullet{} \textsc{$from$}
$endfor$

\vspace{1em}

% Where I print my recipient's name and address
\normalsize \sffamily
$for(to)$
$to$\\
$endfor$

\vspace{3em}

% Where I print city and today's date
\rmfamily
\begin{flushright}
$city$, \today
\end{flushright}

\vspace{1em}

% The special variable $body$ expands to the
% content of letters.md converted to TeX
$body$

{% endhighlight %}

After saving `details.yml` with my data, all there's left to do is running `make` on my prompt. This will result in the following command being executed:

{% highlight bash %}
pandoc details.yml letter.md -o output.pdf --latex-engine=xelatex --template=template.tex
{% endhighlight %}

What's happening there? I'm leveraging the powerful conversion and templating abilities of [Pandoc](http://pandoc.org/) to do most of the work. The command above concatenates `details.yml` and `letter.md` and passes them as input to `pandoc`, which uses their content to populate `template.tex` on the fly and pipes the result to <span class="latex">X<sub>&#398;</sub>T<sub>e</sub>X</span>, that parses then the whole thing and finally outputs a PDF. That might seem complicated, but it's the computer, not me, that has to go through the whole process. I just have to run `make` in the terminal for the magic to happen automatically.

After that, I'm done. I have a PDF ready to be emailed, faxed or printed out.  If you're on OS X, you can now run `open output.pdf` in your terminal to inspect our newly created PDF (on Linux, `xdg-open` or `gnome-open` will probably do the trick). This will look pretty much like this:

{% comment %} <figure class="fullwidth"><img src="http://github.com/mrzool/letter-boilerplate/raw/master/preview.jpg" alt="The result" /></figure> {% endcomment %}
![The PDF output](http://github.com/mrzool/letter-boilerplate/raw/master/preview.jpg)

This is a [high-quality output](/assets/typesetting-automation/output.pdf) [PDF] produced by the most advanced typesetting system available, trusted by thousands of scientists, academics and publishers around the world to typeset advanced mathematical notation with elegance and precision, so you can be sure it can handle the modest needs of basic document production. No fiddling with layout and styling in MS Word or LibreOffice was involved in order to produce this output, nor was painful debugging of <span class="latex">L<sup>a</sup>T<sub>e</sub>X</span> code. And I've never had to leave the terminal.

{% comment %} On a side note, I've used a special command in `template.tex` to fake the date for demostration purposes. In the real world, the date gets generated automatically with `\today`. {% endcomment %}

Now we're done with the creation of the document. Optionally, we can go further and tweak the document's look and feel easily by editing the built-in settings. 

## Playing with the settings

Some basic options are available at the bottom of `details.yml`. Let's see what they do:

{% highlight ruby %}
# Settings
mainfont: Hoefler Text
altfont: Helvetica Neue
monofont: Courier
lang: english
fontsize: 10pt
geometry: a4paper, left=35mm, right=35mm, top=50mm, bottom=25mm
# letterhead: true
{% endhighlight %}

Everything in there is pretty straightforward. The first three options allow us to choose the typefaces for our document.

- **`mainfont`** sets the font for everything.
- **`altfont`** sets the font for the recipient's address.
- **`monofont`** sets the font for code blocks and such.

The best parameter to use here is the *family name* of your chosen font. This is in most cases pretty intuitive (e.g. `Hoefler Text`, `Helvetica Neue`, `Adobe Garamond Pro` are all working options---as long as you have these fonts installed on your system), but, in case of `file not found` issues, you can use utilities like Font Book (OS X) or `fc-list` (Linux, OS X) to inspect the metadata of your font of choice and find the right definition to use.

The **`language`** option sets the main language through the <span class="latex">L<sup>a</sup>T<sub>e</sub>X</span> package `polyglossia`. That's important to load the proper hyphenation patterns, display the date in the right format (*March 3, 2015* becomes *3. März 2015* with `language` set to `german`), adapt some typographical conventions, and a number of other things. The [package documentation](http://mirror.unicorncloud.org/CTAN/macros/latex/contrib/polyglossia/polyglossia.pdf) [PDF] introduction offers a good overview.

The **`fontsize`** option shouldn't need any explanation. Its only quirk is that, due to <span class="latex">L<sup>a</sup>T<sub>e</sub>X</span> limitations, the only values allowed are `10pt`, `11pt` and `12pt`.

The **`geometry`** option takes a string that is used to set document-wide layout options through the `geometry` package. The boilerplate provides some defaults for the margins, but there are a lot more things that you can customize with this package. Check out [this page](https://www.sharelatex.com/learn/Page_size_and_margins) for a good overview and the [official package documentation](http://mirror.physik-pool.tu-berlin.de/tex-archive/macros/latex/contrib/geometry/geometry.pdf) [PDF] if you want to dig deeper.

The last option, **`letterhead`**, is admittedly a bit of a hack. If uncommented and set to `true`, it activates the `wallpaper` package in the template. This package searches for a file named `letterhead.pdf` in the root directory and prints it on the PDF before compiling the rest of the document. This comes in handy if you have a personal or company letterhead and want to use it in your letter. More info on how this works below.

### Transforming our letter

Now let's see how we can dramatically alter the look and feel of our letter just by changing a couple of options. I will change `mainfont` to `Gill Sans`, include a nice letterhead I've built with InDesign (that I've shamelessly copied from the example given in Matthew Butterick's [Letterhead Advices](http://practicaltypography.com/letterhead.html)), and redefine my margins to accomodate the new layout:

{% highlight ruby %}
# Settings
mainfont: Gill Sans
altfont: Helvetica Neue
monofont: Courier
lang: english
fontsize: 10pt
geometry: a4paper, left=90mm, right=22mm, top=22mm, bottom=22mm
letterhead: true
{% endhighlight %}

Now that I've activated the `wallpaper` package by setting `letterhead` to `true`, I need to import my letterhead file. Just like my signature, I keep that in my Dropbox as well:

{% highlight bash %}
cp ~/Dropbox/letterhead.pdf .
{% endhighlight %}

I will also comment out the code that prints the sender address in `template.tex`, because our address is now visible in the letterhead and we don't need that bit anymore:

{% highlight latex %}
% \small
% \textsc{\textbf{$author$}}
% $for(from)$
% \textbullet{} \textsc{$from$}
% $endfor$

% \vspace{1em}

\sffamily
$for(to)$
$to$\\
$endfor$
{% endhighlight %}

Now let's run `make && open output.pdf`. This is what we get:

![PDF output with letterhead](http://i.imgur.com/oxSIsPf.png)

That's quite a [transformation](/assets/typesetting-automation/output-letterhead.pdf) [PDF]. Our custom letterhead gets printed by `wallpaper`, our body text lives now in a narrower column on the right thanks to `geometry`, and the beautiful sans-serif Gill Sans gives our letter a fresher look.

## Conclusion

There's no excuse for bad typography. Just like proper dress and grooming make you look sharp when interacting with others, good typography adds value to your documents and helps getting your message across. The system described in this article yields formidable results with very little hassle. Once you have Pandoc and <span class="latex">L<sup>a</sup>T<sub>e</sub>X</span> installed on your system, getting started with a new document is just a `git clone` away.

Remember: all this is not limited to formal letters. Producing great-looking [invoices](https://github.com/mrzool/invoice-boilerplate) and slick, professional [CVs](https://github.com/mrzool/cv-boilerplate) is just as easy. Make sure to check out the [website of the project](http://mrzool.cc/tex-boilerplates/) for a quick overview of what you can expect, and refer to the `README`s on Github for more detailed instructions. Have fun!

### Recommended readings

Interested in knowing more about plain-text workflows and typesetting automation with Pandoc and <span class="latex">L<sup>a</sup>T<sub>e</sub>X</span>? Make sure to save this small selection of articles in your Instapaper:

- [The Beauty of <span class="latex">L<sup>a</sup>T<sub>e</sub>X</span>](http://nitens.org/taraborelli/latex) by Dario Taraborelli
- [Why Microsoft Word Must Die](http://www.antipope.org/charlie/blog-static/2013/10/why-microsoft-word-must-die.html) by Charlie Stross
- [Sustainable Authorship in Plain Text using Pandoc and Markdown](http://programminghistorian.org/lessons/sustainable-authorship-in-plain-text-using-pandoc-and-markdown) by Dennis Tenen and Grant Wythoff
- [Store everything in text files](http://mnmlist.com/a-case-for-storing-all-your-info-in-text-files/) by Leo Babauta
- [Why I do my résumé in <span class="latex">L<sup>a</sup>T<sub>e</sub>X</span>](http://www.toofishes.net/blog/why-i-do-my-resume-latex/) by Dan McGee

### Further resources

Some great resources on the tools used in this article:

- These [<span class="latex">L<sup>a</sup>T<sub>e</sub>X</span> docs](https://www.sharelatex.com/learn) cover most of the basics and are surprisingly kind to the beginner.
- Refer to [pandoc's documentation](http://pandoc.org/demo/example9/templates.html) to learn more about how templates work.
- Follow the [TeXtip](https://twitter.com/TeXtip) Twitter account.
- The YAML syntax is quite simple but has its quirks. Check out this [overview](http://learnxinyminutes.com/docs/yaml/) to make sure you get everything right.
- Make some new friends on the [<span class="latex">T<sub>e</sub>X</span>-<span class="latex">L<sup>a</sup>T<sub>e</sub>X</span> Stack Exchange](http://tex.stackexchange.com/).
- Matthew Butterick's [Practical Typography](http://practicaltypography.com/): Read it all and thank me later.
