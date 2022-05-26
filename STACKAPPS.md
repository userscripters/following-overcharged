Following Overcharged - Various improvements to the "follow" feature

script posts


<!-- thumbnail:  -->
<!-- version: 1.2.1 -->
<!-- tag: script -->
<!-- excerpt: Following Overcharged contains various improvements to the "follow" feature -->

## Screenshot

![animation of the workflow for unfollowing all posts](https://i.stack.imgur.com/j3D6c.gif)

## About


Following Overcharged (inspired by a [MSE feature request](https://meta.stackexchange.com/q/378980/786798)) is a userscript that provides a set of features improving the "follow" feature.

Current version includes:

| Feature                                        | Default  |
| ---------------------------------------------- | -------- |
| Auto-follow of questions                       | disabled |
| Auto-follow of answers                         | disabled |
| Auto-follow posts on upvoting                  | disabled |
| Auto-follow posts on downvoting                | disabled |
| Auto-follow posts after editing (inline)       | disabled |
| 'Unfollow all' feature to unfollow all posts   | enabled  |

This is a "living" project, so the feature set is likely to be expanded upon in future versions.

The userscript uses the [shared configurer](https://stackapps.com/q/9403/78873) for UserScripters projects as a peer dependency.
Please install it if you want to be able to change the default settings.
This is how the configuration UI looks like:

<img src="https://i.stack.imgur.com/AZQgr.png" width="275" alt="screenshot of the Userscript configurer expanded with options for the Following Overcharged userscript" />


### License

The script is licensed under the [GPL-3.0-or-later](https://spdx.org/licenses/GPL-3.0-or-later) license.

### Download

Latest version: 1.2.1

[Install](https://github.com/userscripters/following-overcharged/raw/master/dist/modern/index.user.js) | [Minified](https://github.com/userscripters/following-overcharged/raw/master/dist/modern/index.min.user.js)

### Platform

Version number means "last tested on":

| Chrome | Edge | Explorer | Firefox | Opera |
| - | - | - | - | - |
| ✔ 101.0.4951.67 | - | - | - | - |

## Change log

| Version    | Description |
| ---------- | ----------- |
| 1.2.1 |             |

## Contact

Author: Oleg Valter
<br>Organization: [UserScripters](https://github.com/userscripters)

Please, submit bug reports [on the source repository](https://github.com/userscripters/following-overcharged/issues).
<br>Before adding a new one, please check if it hasn't been raised before.

You can also [drop by to chat](https://chat.stackoverflow.com/rooms/214345), we are a friendly bunch.

## Code

[Source code](https://github.com/userscripters/following-overcharged/blob/master/src/index.ts) is written in TypeScript.

Contributions are welcome, you can always [submit a PR here](https://github.com/userscripters/following-overcharged/pulls).