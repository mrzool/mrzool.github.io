Vim Gotchas
===========

A small but growing collection of useful tips for Vim, the best text editor on Earth.

Normal mode
-----------

`d/{pattern}` Delete till `{pattern}` excluded. Power move.

`gi` go to last insertion place and switch to insert mode. Great little time saver.

The text object `iw` (inner word) works better with the change command (ex: `ciw` to change the word under the cursor). 
The text object `aw` (a word) works better with the delete command (ex: `daw` to delete the work under the cursor plus one space).

`mA` creates a global mark that can be used to snap back to the present file and *persists between sessions*. Pretty rad.

`xp` Transpose the next two characters.
`ddp` Transpose this line with the following one.

`"adaw` Inserts the current word into register `a`, overwriting it.
`"Adaw` Appends the current word to register `a`.

`H`/`M`/`L` Jump to top/bottom/middle of the screen.

`%` Jump to matching parenthesis. Power move when used with `c` or `d`, for example `%d%` finds the next parenthesis/brace/quote, jumps to its matching one, and deletes everything between the two. Read more about this [here](http://thepugautomatic.com/2014/03/vims-life-changing-c-percent/).

`Ctrl-z` suspends Vim and returns control to bash. `jobs` inspects the list of suspended jobs.  `fg` brings Vim back exactly as you left it.

Insert mode
-----------

`<C-a>` Insert last inserted text.

`<C-h> <C-w> <C-u>` Deletes back one character, one word, one line. Works also in ex mode and in your bash shell.

`<C-x>` Switches to *completion mode*, which is a submode of insert mode. From there you can:

- `<C-f>` Auto-complete paths relative to the current working directory.
- `<C-]>` Auto-complete using ctags (symbols in your code).
- `<C-p>` or `<C-n>` Context-aware word completion.
- `<C-l>` Context-aware line completion.
- `<C-o>` Context-aware language completion.

`<C-r>=` Access the expression register to do simple math on the fly.

`<C-k>` Activate digraph mode to insert unusual characters not found on the keyboard (ex: `<C-k>a:` inserts `ä`). Go to `:h digraph-table` for a list of possible combinations, search in it with `/`.

Visual mode
-----------

`o` In Visual mode, toggle the free end of visual selected text. Useful to change the starting point of a visual selection without leaving Visual mode and starting afresh.

Ex mode
-------

`:e!` Read the file from disk back into the buffer.

`:lcd {path}` Set the working directory locally for the current window, so you can scope different windows or tabs to different projects.

`:jumps` Inspect the jump list. `<C-o` and `<C-i>` jump back and forth in normal mode.

`:changes` Inspect the changes list. `g;` and `g,` traverse the change list in normal mode.

Configuration
-------------

Recursive mappings are dangerous. Always use nonrecursive mappings instead (`noremap`, `nnoremap`, `vnoremap`, and `inoremap`).

General
-------

Vim is optimized for the touch typist. First learn to touch type, then learn Vim. 

With Vim, Unix is your IDE. Learn how to pipe text in and out Vim and to work with external shell commands.

