const discord = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["pong"],
    usage: "ping",
    description: "Get the bot's ping!",
    run: async (Bot, message, args) => {
      try{
        let start = Date.now();
        message.channel.send({embed: {description: "Looks like the bot is slow.", color: "RANDOM"}}).then(m => {
          
          let end = Date.now();
          
          let embed = new discord.MessageEmbed()
          .setAuthor("Ping!", message.author.avatarURL())
          .addField("API Latency", Math.round(Bot.ws.ping) + "ms", true)
          .addField("Message Latency", end - start + "ms", true)
          .setColor("RANDOM");
          m.edit(embed).catch(e => message.channel.send(e))
          
        })
} catch (err) {
console.log(err)
}
    }
};