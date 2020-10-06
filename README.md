# authgg-bot
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
A Discord bot utilizing Discord.JS to interact with auth.gg's "admin" API; used to create keys, check key info, ban keys, etc.
In order to use this you'll need to enter your Discord ID as well as any other people you want to be able to use commands and your auth.gg admin API key.

Known Bugs:
- When creating a key above 999 days, the bot doesn't respond with a proper "invalid length", but instead just fails the get request and displays the key as "undefined".
