const Discord = require('discord.js');
const { print } = require('./globals');
const { key, reset, keyinfo, userinfo, ban, ping, help, invalid } = require('./commands');
const client = new Discord.Client();

client.on("ready", () => {
	print("Logged in as: " + client.user.tag + " | " + client.user.id); // log entry
	client.user.setStatus("dnd") // set status
	client.user.setPresence({ // set presence
        game: {
            name: "$help",
            type: "STREAMING",
            url: "https://google.com/" // whatever your site is, or just change the type or wtv if u dont have one
        }
    });
});

client.on("message", async message => {
	let authorizedids = ["IDs"]
	if (!authorizedids.includes(message.author.id)) return;

	if (message.content.charAt(0) != '$') return; // return if first char of message isnt $
	var input = message.content.split(/(\s+)/); // parse message as array of words
	for (var i = 0; i < input.length; i++) {
		if (input[i] == " ") input.splice(i, 1); // remove empty spaces from array
	}
	
	switch (input[0]) {
		case "$key":
			key(message, client, input[1]);
			break;
		case "$reset":
			reset(message, client, input[1])
			break;
		case "$keyinfo":
			keyinfo(message, client, input[1])
			break;
		case "$userinfo":
			userinfo(message, client, input[1])
			break;
		case "$ban":
			ban(message, client, input[1])
			break;
		case "$ping":
			ping(message)
			break;
		case "$help":
			help(message);
			break;
		default:
			invalid(message);
			break;
	}
});

client.login("TOKEN");