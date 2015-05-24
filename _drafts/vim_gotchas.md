---
layout: post
title: Vim Gotchas
---

## Vim Gotchas

A small but growing collection of tips and tricks for the best text editor on Earth. This doesn't aim to be a comprehensive list of Vim commands, but only an opinionated collection of what leveled up my Vim game. Every tip is briefly explained and I tried to come up with a use case for every one of them. Mostly aimed at the intermediate user.

### General

Become a touch-typist. It's not that hard. There are 

A fact that doesn't seem to get enough attention is that, if you need to watch your keyboard  all the time while you type, you are missing out on a lot of what makes Vim so powerful. Drew Neil mentions this point at the very beginning of [Practical Vim](https://pragprog.com/book/dnvim/practical-vim): Vim is designed for the touch-typist. 

There are two excellent command line utilities to help you improve this skill, `typespeed` and `gtypist`. Half an hour of practicing a day will go a long way.

With Vim, Unix is your IDE. Learn how to pipe text in and out Vim and to work with external shell commands.

### Configuration tips

Map your `<Esc>` key to `jj`.

Remap your Caps-lock to `<Ctrl>`.

Recursive mappings are dangerous. Always use nonrecursive mappings instead (`noremap`, `nnoremap`, `vnoremap`, and `inoremap`).


### Normal mode

`d/{pattern}` `c/{pattern}` Delete or change till `{pattern}` excluded. Power move.

`gi` go to last insertion place and switch to insert mode after you moved around. Great little time saver.

The text object `iw` (inner word) works better with the change command (ex: `ciw` to change the word under the cursor). 
The text object `aw` (a word) works better with the delete command (ex: `daw` to delete the work under the cursor plus one space).

`mA` Setting a mark using a capital letter creates a *global mark* that can be used to snap back to the present file and *persists between sessions*. Super useful to mark files you keep coming back to and access them fast.

`xp` Transpose the next two characters.
`ddp` Transpose the current line with the following one.

`"adaw` Inserts the current word into register `a`, overwriting it.  
`"Adaw` Appends the current word to register `a`, leaving preexisting content alone.

`H` `M` `L` Jump to the top, bottom, and middle of the screen.

`%` Jump to matching parenthesis. Power move when used in conjunction with `c` or `d`. (for example `%d%` finds the next parenthesis/brace/quote, jumps to its matching one, and deletes everything between the two. Read more about how this works [here](http://thepugautomatic.com/2014/03/vims-life-changing-c-percent/))

`Ctrl-z` suspends Vim and returns control to the shell. `jobs` inspects the list of suspended jobs from the shell.  `fg` brings Vim back exactly as you left it. I use it all the time to run git commands.

### Insert mode

`<C-h>` `<C-w>` `<C-u>` Deletes back one character, one word, and one line respectively.

`<C-Left>` `<C-Right>` Go to one word to the left/to the right.

`<Insert>` Toggles between inserting and replacing characters.

(The above commands work in command mode and in most shells as well)

`<C-a>` Insert last inserted text.

`<C-x>` Switches to *completion mode*, which is a submode of insert mode. From there you can:

- `<C-f>` Auto-complete paths relative to the current working directory.
- `<C-]>` Auto-complete using ctags (symbols in your code).
- `<C-p>` or `<C-n>` Context-aware word completion.
- `<C-l>` Context-aware line completion.
- `<C-o>` Context-aware language completion.

`<C-r>=` Access the expression register to do simple math on the fly.

`<C-k>` Activate digraph mode to insert unusual characters not found on the keyboard (ex: `<C-k>a:` inserts `ä`). Go to `:h digraph-table` for a list of possible combinations, search in it with `/`.

### Visual mode

`o` Toggle the free end of visual selected text. Useful to change the starting point of a visual selection without leaving Visual mode and starting afresh.
`O` Like above, but in visual block mode moves on the other corner on the same line.

`gv` It's actually a normal mode command, but visual mode related. It stands for "grab last visual selection".

### Command mode

`:e!` Read the file from disk back into the buffer.

`:lcd {path}` Set the working directory locally for the current window, so you can scope different windows or tabs to different projects.

`:jumps` Vim remembers every position your cursor has been, kind of like the NSA of text editors. With this command you can inspect the jump list. `<C-o` and `<C-i>` jump back and forth in normal mode.

`:changes` Inspect the changes list. `g;` and `g,` traverse the change list in normal mode.

---

#### Resources

-   [Relative line numbers in Vim for super-fast
    movement](http://jeffkreeftmeijer.com/2012/relative-line-numbers-in-vim-for-super-fast-movement/)
-   [Vim Productivity Tips And
    Tricks](http://ideasintosoftware.com/vim-productivity-tips/)
-   [Why I can't stop using
    Vim](http://www.kornerstoane.com/2014/06/why-i-cant-stop-using-vim/)
-   [Vim tips: Working with external commands |
    Linux.com](https://www.linux.com/learn/tutorials/442419-vim-tips-working-with-external-commands)
-   [Vim Text Objects: The Definitive
    Guide](http://blog.carbonfive.com/2011/10/17/vim-text-objects-the-definitive-guide/)
-   [Timothée Poisot | Using Vim as a writing
    environment](http://timotheepoisot.fr/2014/01/01/vim-writing-environment/)
-   [How I boosted my Vim](http://nvie.com/posts/how-i-boosted-my-vim/)
-   [Vim anti-patterns -
    Arabesque](http://blog.sanctum.geek.nz/vim-anti-patterns/)
-   [Vim misconceptions -
    Arabesque](http://blog.sanctum.geek.nz/vim-misconceptions/)
-   [Let Vim do the
    typing](http://georgebrock.github.io/talks/vim-completion/)
-   [Vim Koans - Arabesque](http://blog.sanctum.geek.nz/vim-koans/)
-   [Zenclavier: Extreme Keyboarding - O'Reilly
    Media](http://archive.oreilly.com/pub/a/oreilly//news/zenclavier_1299.html)
-   [❺➠ How to switch to Vim - Naildrivin'
    ❺](http://www.naildrivin5.com/blog/2013/04/24/how-to-switch-to-vim.html)
-   [YBlog - Learn Vim
    Progressively](http://yannesposito.com/Scratch/en/blog/Learn-Vim-Progressively/)
-   [Geoff's site: Why Neovim is Better than
    Vim](http://geoff.greer.fm/2015/01/15/why-neovim-is-better-than-vim/)
-   [Vim annoyances -
    Arabesque](http://blog.sanctum.geek.nz/vim-annoyances/)
-   [Anti-pattern of vimrc -
    rbtnn雑記](http://rbtnn.hateblo.jp/entry/2014/12/28/010913)
-   [Coming Home to Vim / Steve
    Losh](http://stevelosh.com/blog/2010/09/coming-home-to-vim/)
-   [Vim Introduction and Tutorial -
    IMHO](http://blog.interlinked.org/tutorials/vim_tutorial.html)
-   [10 Questions with Vim's creator, Bram
    Moolenaar](http://www.binpress.com/blog/2014/11/19/vim-creator-bram-moolenaar-interview/)
-   [Vim's life-changing c% - The Pug
    Automatic](http://thepugautomatic.com/2014/03/vims-life-changing-c-percent/)
-   [Learning to use Vim
    buffers.](http://www.patrickedelman.com/learning-to-use-vim-buffers/)
-   [Ex Mode](http://usevim.com/2014/09/19/ex-mode/)
-   [How to boost your Vim productivity ·
    sheerun](http://sheerun.net/2014/03/21/how-to-boost-your-vim-productivity/)
-   [Vim Splits - Move Faster and More
    Naturally](http://robots.thoughtbot.com/vim-splits-move-faster-and-more-naturally)
-   [Vim for people who think things like Vim are weird and hard – CSS
    Wizardry – CSS, OOCSS, front-end architecture, performance and more,
    by Harry
    Roberts](http://csswizardry.com/2014/06/vim-for-people-who-think-things-like-vim-are-weird-and-hard/)
-   [Why I use Vim · Pascal
    Precht](http://pascalprecht.github.io/2014/03/18/why-i-use-vim/)
-   [Why Atom Can’t Replace
    Vim](https://medium.com/programming-ideas-tutorial-and-experience/why-atom-cant-replace-vim-433852f4b4d1)
-   [Why, oh WHY, do those \#?@! nutheads use
    vi?](http://www.viemu.com/a-why-vi-vim.html)
-   [Vim: Seven habits of effective text
    editing](http://www.moolenaar.net/habits.html)
-   [In defense of vi - Naildrivin'
    ❺](http://www.naildrivin5.com/blog/2010/06/14/in-defense-of-vi.html)
-   [Why Atom Can’t Replace
    Vim](https://medium.com/programming-ideas-tutorial-and-experience/433852f4b4d1)
-   [☠☣ • How to Learn
    Vim](http://xn--h4hg.ws/2013/12/19/how-to-learn-vim/)
-   [The Vim Learning Curve is a
    Myth](http://robots.thoughtbot.com/the-vim-learning-curve-is-a-myth)

