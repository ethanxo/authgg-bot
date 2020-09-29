const Discord = require('discord.js');
const request = require('request');
const { print, sendEmbed, sendSecretEmbed } = require('./globals');

const authorization = "AUTHORIZATION";

function key(message, client, days) {
	var daysparsed = parseInt(days);

	if (days == null || daysparsed < 1 || daysparsed > 99999)
    {
		var embed_dayserror = new Discord.RichEmbed()
		.setDescription("Invalid parameter <days>; please use $help to view correct command usage.");
		sendEmbed(embed_dayserror, message);
		return;
	}

	request("https://developers.auth.gg/LICENSES/?type=generate&days=" + daysparsed + "&amount=1&level=1&format=5&authorization=" + authorization, { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
		var returnkey = body["0"];
		
		message.channel.send(returnkey); // bc retards on mobile half the time
		var embed_key = new Discord.RichEmbed()
		.addField(daysparsed + " Day Key", returnkey);
		sendEmbed(embed_key, message);

		var embed_secret = new Discord.RichEmbed()
		.setDescription(message.author.tag + " successfully created a " + daysparsed + " day key: " + returnkey + ".");
		sendSecretEmbed(embed_secret, client);

		print(message.author.tag + ": sucessfully created key " + returnkey);
	});
}

function reset(message, client, key) {
	if (key == null)
    {
		var embed_keyerror = new Discord.RichEmbed()
		.setDescription("Invalid parameter <key>; please use $help to view correct command usage.");
		sendEmbed(embed_keyerror, message);
		return;
	}

	request("https://developers.auth.gg/HWID/?type=reset&authorization=" + authorization + "&user=" + key, { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
		var returnstatus = body["status"];

		if (returnstatus == "success") {
			var embed_reset = new Discord.RichEmbed()
			.setDescription("Successfully reset HWID.");
			sendEmbed(embed_reset, message);

			//var embed_secret = new Discord.RichEmbed()
			//.setDescription(message.author.tag + " successfully reset HWID on key: " + key + ".");
			//sendSecretEmbed(embed_secret, client);

			print(message.author.tag + ": succesfully reset HWID on key " + key);
		}
		else {
			var embed_keyerror = new Discord.RichEmbed()
			.setDescription("Invalid or unused key.");
			sendEmbed(embed_keyerror, message);
		}
	});
}

function keyinfo(message, client, key) {
	if (key == null)
    {
		var embed_keyerror = new Discord.RichEmbed()
		.setDescription("Invalid parameter <key>; please use $help to view correct command usage.");
		sendEmbed(embed_keyerror, message);
		return;
	}

	request("https://developers.auth.gg/LICENSES/?type=fetch&authorization=" + authorization + "&license=" + key, { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
		var returnstatus = body["status"];
		var returnlicense = body["license"];
		var returnused = body["used"];
		var returncreated = body["created"];

		if (returnstatus == "success") {
			var embed_reset = new Discord.RichEmbed()
			.addField("License", returnlicense)
			.addField("Used", returnused)
			.addField("Created", returncreated);
			sendEmbed(embed_reset, message);

			print(message.author.tag + ": successfully got info on key " + key);
		}
		else {
			var embed_keyerror = new Discord.RichEmbed()
			.setDescription("Invalid key.");
			sendEmbed(embed_keyerror, message);
		}
	});
}

function userinfo(message, client, key) {
	if (key == null)
    {
		var embed_keyerror = new Discord.RichEmbed()
		.setDescription("Invalid parameter <key>; please use $help to view correct command usage.");
		sendEmbed(embed_keyerror, message);
		return;
	}

	request("https://developers.auth.gg/USERS/?type=fetch&authorization=" + authorization + "&user=" + key, { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
		var returnstatus = body["status"];
		var returnhwid = body["hwid"];
		var returnlastlogin = body["lastlogin"];
		var returnlastip = body["lastip"];
		var returnexpiry = body["expiry"];

		
		if (returnlastip == "") returnlastip = "null"; if (returnlastlogin == "") returnlastlogin = "null"; // gay check to see if lastlogin and lastip are null because for some reason they return blank which fucks the embed
		

		if (returnstatus == "success") {
			var embed_reset = new Discord.RichEmbed()			
			.addField("HWID", returnhwid)
			.addField("Last Login", returnlastlogin)
			.addField("Last IP", returnlastip)
			.addField("Expiry", returnexpiry);
			sendEmbed(embed_reset, message);

			print(message.author.tag + ": successfully got info on user " + key);
		}
		else {
			var embed_keyerror = new Discord.RichEmbed()
			.setDescription("Invalid or unused key.");
			sendEmbed(embed_keyerror, message);
		}
	});
}

function ban(message, client, key) {
	if (key == null)
    {
		var embed_keyerror = new Discord.RichEmbed()
		.setDescription("Invalid parameter <key>; please use $help to view correct command usage.");
		sendEmbed(embed_keyerror, message);
		return;
	}

	request("https://developers.auth.gg/LICENSES/?type=delete&license=" + key + "&authorization=" + authorization, { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
		var returnstatus = body["status"];
		
		if (returnstatus == "success") {
			var embed_ban = new Discord.RichEmbed()			
			.setDescription("Sucessfully banned key.");
			sendEmbed(embed_ban, message);

			//var embed_secret = new Discord.RichEmbed()
			//.setDescription(message.author.tag + " successfully banned key: " + key + ".");
			//sendSecretEmbed(embed_secret, client);

			print(message.author.tag + ": successfully banned key " + key);
		}
		else {
			var embed_keyerror = new Discord.RichEmbed()
			.setDescription("Invalid key.");
			sendEmbed(embed_keyerror, message);
		}
	});

	request("https://developers.auth.gg/USERS/?type=delete&authorization=" + authorization + "&user=" + key, { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
	});
}

function ping(message) {
	var pong = Math.abs(Date.now() - message.createdTimestamp) + " ms";

	var embed_pong = new Discord.RichEmbed()
	.setDescription("Pong! " + pong);
	
	sendEmbed(embed_pong, message);
}

function help(message) {
	var embed_help = new Discord.RichEmbed()
	.addField("$key", "<days> | creates a key with the given number of days (integer greater than or equal to 1 and less than or equal to 99999)")
	.addField("$reset", "<key> | resets the given key's HWID")
	.addField("$keyinfo", "<key> | shows given key's info")
	.addField("$userinfo", "<key> | shows given user's info")
	.addField("$ban", "<key> | deletes the given key (and the user associated with it if there is one)")
	.addField("$ping", "returns the difference in the time between the command and the bot's response")
	.addField("$help", "you're looking at it right now goofball");
	
	sendEmbed(embed_help, message);
}

function invalid(message) {
	var embed_invalid = new Discord.RichEmbed()
	.setDescription("Invalid command.");
	
	sendEmbed(embed_invalid, message);
}

exports.key = key;
exports.reset = reset;
exports.keyinfo = keyinfo;
exports.userinfo = userinfo;
exports.ban = ban;
exports.ping = ping;
exports.help = help;
exports.invalid = invalid;