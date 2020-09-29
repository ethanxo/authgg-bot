function watermark() {
	// get full timestring ex. (["20:32:01", "GMT+0530", "(India", "Standard", "Time)"]) and get first value (just time)
	var date = new Date();
	var datetext = date.toTimeString().split(' ')[0] 
	return "[authbot | " + datetext + "] "; 
}

function print(content, message) {
	console.log("\x1b[35m" + watermark() + "\x1b[37m" + content); 
}

function sendEmbed(embedtosend, message) {
	embedtosend.setColor("#ff00ff"); 
	embedtosend.setTitle(watermark());
	embedtosend.setFooter("authbot");
	// message.channel.send("<@" + message.author.id + ">", embedtosend);
	message.channel.send(embedtosend);
}

function sendSecretEmbed(embedtosend, client) {
	embedtosend.setColor("#ff00ff");
	embedtosend.setTitle(watermark());
	embedtosend.setFooter("authbot");
	client.channels.get("733895319749787686").send("<@177890975807438848>", embedtosend);
}

exports.watermark = watermark;
exports.print = print;
exports.sendEmbed = sendEmbed;
exports.sendSecretEmbed = sendSecretEmbed;