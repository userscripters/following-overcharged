
# About

| Author       | Oleg Valter<br>[oleg.a.valter@gmail.com](mailto:oleg.a.valter@gmail.com) |
| :----------- | :----------------------- |
| Name | @userscripters/following-overcharged |
| Description | Various improvements to the "follow" feature |
| License | [GPL-3.0-or-later](https://spdx.org/licenses/GPL-3.0-or-later) |
| Version | 2.0.0 |

---

![animation of the workflow for unfollowing all posts](https://i.stack.imgur.com/nwjiU.gif)

Following Overcharged (inspired by a [MSE feature request](https://meta.stackexchange.com/q/378980/786798)) is a userscript that provides a set of features improving the "follow" feature.

Current version includes:

| Feature                                            | Default  |
| -------------------------------------------------- | -------- |
| Auto-follow of questions                           | disabled |
| Auto-follow of answers                             | disabled |
| Auto-follow posts on upvoting                      | disabled |
| Auto-follow posts on downvoting                    | disabled |
| Auto-follow posts on voting to close               | disabled |
| Auto-follow posts on flagging                      | disabled |
| Auto-follow posts after editing (inline)           | disabled |
| Auto-follow posts upon bookmarking                 | disabled |
| Auto-follow posts upon commenting                  | disabled |
| 'Unfollow all' feature to unfollow all posts       | enabled  |
| 'Unfollow all' by type (questions or answers only) | enabled  |

This is a "living" project, so the feature set is likely to be expanded upon in future versions.

The userscript uses the [shared configurer](https://stackapps.com/q/9403/78873) for UserScripters projects as a peer dependency.
Please install it if you want to be able to change the default settings (since v2.0.0, settings are stored in the script's storage, and central storage is used as a fallback mechanism).
This is how the configuration UI looks like:

<img src="https://i.stack.imgur.com/MfZlh.png" width="275" alt="screenshot of the Userscript configurer expanded with options for the Following Overcharged userscript" />

Changes made to settings when using the configurer are *live* and do not require the page to be reloaded.

### Unfollow all

When visiting one's profile "following" tab, an "unfollow all" button will be added to the right of the action list.
Upon clicking it, a modal for initiating the unfollow procedure is loaded.
The "Start" button launches the process which can be stopped at any time via the "Abort" button.

The script keeps track of the posts that were unfollowed, so unless the page is reloaded, there is a way to re-follow all posts by clicking the "Undo" button.
The re-follow action can be stopped at any time via the same "Abort" button too.

> NB! Turning on the "reload on done" option makes the changes truly permanent


# Support

Bug reports for the project should be [submitted here](https://github.com/userscripters/following-overcharged/issues).
<br>Before adding a new one, please check if it hasn't been raised before.
  