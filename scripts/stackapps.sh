generate-stackapps \
    --about "
Following Overcharged (inspired by a [MSE feature request](https://meta.stackexchange.com/q/378980/786798)) is a userscript that provides a set of features improving the \"follow\" feature. Current version includes:
- Auto-following of questions (disabled by default)
- Auto-following of answers (disabled by default)
- \"Unfollow all\" feature to unfollow all posts

This is a \"living\" project, so the feature set is likely to be expanded upon in future versions.

The userscript uses the [shared configurer](https://stackapps.com/q/9403/78873) for UserScripters projects as a peer dependency.
Please install it if you want to be able to change the default settings.
This is how the configuration UI looks like:

![screenshot of the Userscript configurer expanded with 3 options for the Following Overcharged userscript](https://i.stack.imgur.com/wM6kh.png)
" \
    --chrome "101.0.4951.67" \
    --excerpt "Following Overcharged contains various improvements to the \"follow\" feature" \
    --install "https://github.com/userscripters/following-overcharged/raw/master/dist/modern/index.user.js" \
    --minified "https://github.com/userscripters/following-overcharged/raw/master/dist/modern/index.min.user.js" \
    --language "TypeScript" \
    --org-name "UserScripters" \
    --org-url "https://github.com/userscripters" \
    --room "https://chat.stackoverflow.com/rooms/214345" \
    --screenshot-alt "animation of the workflow for unfollowing all posts" \
    --screenshot-url "https://i.stack.imgur.com/j3D6c.gif" \
    --tag "script" \
    --tag "posts"
