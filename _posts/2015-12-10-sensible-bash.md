---
layout: post
title: Sensible Bash
subtitle: Small & opinionated selection of basic Bash configurations to make its defaults suck less 
GistID: 086e8495641804e5ed3a
---

<span class="newthought">there's a small set</span> of simple Bash options through which we can remove certain limitations considered typical of command-line interfaces, thus dramatically improving the user experience. These options enable small optimizations that might not seem like a big deal at first, but every keystroke saved adds up rapidly if you're a heavy terminal user. After reading this article, you will be able to use Bash to move into directories using less keystrokes, enjoy a smarter tab completion, work with a command history that actually makes sense, and jump everywhere in your file system at the speed of thought. All this without relying on any convoluted hack, just plain native or quasi-native Bash options.

Every option listed in this article is [packaged in a repo on GitHub](https://github.com/mrzool/bash-sensible) and can be enabled from your Bash configuration file, namely `bashrc` or `bash_profile`. The difference between the two is clearly explained in [this short post](http://www.joshstaiger.org/archives/2005/07/bash_profile_vs.html) by Josh Staiger. If you're on OS X, I recommend you to follow Josh's advice of sourcing `bashrc` from `bash_profile` so to keep all your configuration in one place. I will assume you did this throughout the rest of the article.

A couple of caveats before jumping in: since changes to Bash configuration require you to reload your config file to become effective, you might want to save you some typing by setting up an alias that does that:

{% highlight bash %}
alias refresh='source ~/.bashrc'
{% endhighlight %}

Also, make sure you have the [Bash Completion](http://bash-completion.alioth.debian.org/) package installed and properly configured on your system, as some of the options described here will not work properly without it.

### Smarter tab completion

[Readline](https://cnswww.cns.cwru.edu/php/chet/readline/rltop.html) is the GNU library that provides an unified interface for advanced line editing to CLI programs like Bash. As command-line user, you use it all the time. Tab completion? Powered by Readline. Emacs-like key bindings like `C-w` to delete back one word? Powered by Readline. Incremental history search? Powered by Readline.

The capabilities provided by Readline are so symbiotic to Bash that most users consider them native Bash features (this is what I meant above with *quasi-native* Bash options). They're not, but we can set them from our `bashrc` anyway by using the built-in Bash command `bind`. Here are my favorites, each improving a different aspect of tab completion:

{% highlight bash %}
bind "set completion-ignore-case on"
bind "set completion-map-case on"
bind "set show-all-if-ambiguous on"
{% endhighlight %}

The option **`completion-ignore-case`** tells Readline to perform filename completion in a case-insensitive fashion. This is almost always what you want, and it comes in handy particularly on OS X, where system folders are capitalized by default: I no longer need to press `<Shift>` when I want to `cd` into `Documents`, typing `cd do<Tab>` will be enough.

With **`completion-map-case`**, filename matching during completion will treat hyphens and underscores as equivalent. Since in most keyboard layouts typing an underscore usually requires pressing `<Shift>`, that's another keystroke saved. This option requires `completion-ignore-case` to be enabled.

Lastly, **`show-all-of-ambiguous`** will get Readline to display all possible matches for an ambiguous pattern at the first `<Tab>` press instead of at the second. This is another small UX improvement you will get used to in no time.

There are tons of other cool Readline runtime behaviors you can activate, like [vi-like key bindings](http://blog.sanctum.geek.nz/vi-mode-in-bash/) or some clever [history-search tweaks](https://coderwall.com/p/oqtj8w/the-single-most-useful-thing-in-bash). As your configuration grows, consider using a dedicated `initrc`, Readline's [default configuration file](http://cnswww.cns.cwru.edu/php/chet/readline/readline.html#SEC9), instead of cluttering your `bashrc` with too many `bind` statements. This is [mine](https://github.com/mrzool/dotfiles/blob/master/inputrc).

### Better History

Most of the options below are taken from the article [Better Bash History](http://blog.sanctum.geek.nz/better-bash-history/) by Tom Ryder. They enable history behaviors that make sense and ease the job when it comes to searching or parsing the archive. Each line is briefly explained by a comment, refer to the [original post](http://blog.sanctum.geek.nz/better-bash-history/) if you want to dig deeper.

{% highlight bash %}
# Append to the history file, don't overwrite it
shopt -s histappend

# Save multi-line commands as one command
shopt -s cmdhist

# Record each line as it gets issued
PROMPT_COMMAND='history -a'

# Huge history. Doesn't appear to slow things down, so why not?
HISTSIZE=500000
HISTFILESIZE=100000

# Avoid duplicate entries
HISTCONTROL="erasedups:ignoreboth"

# Don't record some commands
export HISTIGNORE="&:[ ]*:exit:ls:bg:fg:history"

# Useful timestamp format
HISTTIMEFORMAT='%F %T '
{% endhighlight %}

### Better, faster directory navigation I

Here are three lovely options that will considerably speed up the way you navigate through the file system:

{% highlight bash %}
shopt -s autocd
shopt -s dirspell
shopt -s cdspell
{% endhighlight %}

The option **`autocd`** will spare you the hassle of typing `cd` every time you need to navigate into a directory. You just need to type the name of your target: Bash will understand what you want and prepend `cd` for you. This also works for the common shortcut `..` to go to the parent directory. Sadly, it doesn't work for `-` to go back to the previous working directory, but you can get around that by setting up an alias using this [clever trick](http://askubuntu.com/questions/146031/bash-alias-alias-name-should-be-a-simple-dash-not-working).

In addition, **`dirspell`** and **`cdspell`** will get Bash to autocorrect minor spelling errors like transposed characters in directory names: the former during tab completion, the latter in arguments already supplied to the `cd` command.

### Better, faster directory navigation II

By default, `cd` will look in the current directory for possible targets you might want to move into. This behavior is defined by the environment variable **`CDPATH`**, that thus looks like `CDPATH="."` by default. You can add more paths to this variable by separating them with a colon. This is how my `CDPATH` looks:

{% highlight bash %}
CDPATH=".:~/repos"
{% endhighlight %}

Simply enough, I've added the directory where I keep all my projects (`~/repos`) to the list of possible `cd` targets. Now, whenever I want to jump to a particular project, I just have to type its name's first letters at my prompt. As soon as I press `<Tab>`, the project's name I'm looking for will pop up in the suggestions and I'll be able to jump into it right away, regardless of my current directory. No more typing long and complex paths at the prompt.

My `~/repos` folder is the only place I want to be able to rapidly jump into wherever I am, so this slightly conservative `CDPATH` definition is enough for my needs. Feel free to add more folders---just try to limit yourself to those that are actually important to avoid requiring a pager every time you tab-complete a `cd` command.

Let's now look at another native option, `cdable_vars`, that has a similar effect but allows for finer-grained control.

### Better, faster directory navigation III

In case you were using this [nifty hack](http://jeroenjanssens.com/2013/08/16/quickly-navigate-your-filesystem-from-the-command-line.html) to bookmark your favorite directories to be able to jump into them from everywhere---like I did until not so long ago---I have good news for you: You can stop using it right away. This ability is already baked into Bash and can be enabled through the native option `cdable_vars`:

{% highlight bash %}
shopt -s cdable_vars
{% endhighlight %}

With this option set, we can then define and export variables containing paths to our most important directories and `cd` into them from our prompt, thus enabling a simple, effective and hack-free bookmarking system:

{% highlight bash %}
# Don't use ~ to define your home here, it won't work.
export dotfiles="$HOME/dotfiles"
export repos="$HOME/repos"
export documents="$HOME/Documents"
export dropbox="$HOME/Dropbox"
{% endhighlight %}

## Conclusion

As said at the beginning, I came to rely on this setup so much that it has become my new default, so I packaged it in a [repo on GitHub](https://github.com/mrzool/bash-sensible) that's meant to be something along the lines of Tim Pope's [sensible.vim](https://github.com/tpope/vim-sensible). If you think I've missed something important, you can open an issue, send a pull request or let me know on [Twitter](http://twitter.com/mrzool_).

