const colors = require("colors");//Declared Dependencies
const Discord = require("discord.js");
const { Collection } = require("discord.js");
let config = require('./config.json');
const command = require("./handler/command");

const SData = require('./models/serverdata.js');//MongoDB Model
const mongoose = require("mongoose");

const Bot = new Discord.Client();//Declared Client - Gives the Bot Life

Bot.commands = new Collection();//These Collections store Commands and Aliases
Bot.aliases = new Collection();

try{
    console.log(`[>] Loading Commands`)
    //REDIRECTS TO COMMAND HANDLER
        require(`./handler/command`)(Bot);
    
    console.log(`[>] Loaded a total of ${Bot.commands.size} Commands`)

        console.log(`[>] Connecting to DataBase`)
        mongoose.connect(config.MONGODB_URL,{//Connecting to MongoDB
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
                
            Bot.on(`ready`, async () =>{
                console.log(
                    colors.red(`${Bot.user.username}`) + colors.white(` has woken up!`)//Sends a Wake Up Message to the Console
                );
                
                    Bot.user.setPresence({ status: 'online' });//Changing its Discord Presence (Making it look Online)
                        Bot.user.setActivity(`in ${Bot.guilds.cache.size} Servers with ${Bot.users.cache.size} Users!`, {type: "PLAYING",}//Setting the Bot Status
                        );
            })
            
            Bot.on(`message`, async (message) =>{
                SData.findOne({
                    id:message.guild.id
                    },async (err,ServerData)=>{
                        if(err){
                            return console.log(`[>] Cannot connect to DataBase!\nERROR: ${err}`);//Logs if cannot connect to DB
                        }else if(!err){
                                if(ServerData){
                                        if (message.content === `<@${Bot.user}>`){
                                            return message.channel.send(`Hello! My prefix is ${ServerData.prefix}!`);
                                            }
                                            if (message.content.startsWith(ServerData.prefix)){
                                                let args = message.content.slice(ServerData.prefix.length).trim().split(/ +/g);
                                                    const cmd = args.shift().toLowerCase();
                                                        if(cmd.length ===0) return;
                                                            let command =  Bot.commands.get(Bot.aliases.get(cmd)) || Bot.commands.get(cmd);
                                                                if(!command){
                                                                    return;
                                                                } else { command.run(Bot, message, args).catch(console.error()); }
                                            } 
                                }else if(!ServerData){
                                    const newD = new SData({
                                        id:message.guild.id,
                                        prefix:config.CLIENT_PREFIX,
                                    })
                                        newD.save().catch(err => console.log(err));
                                    }}
                                })
                            })

}catch(err){console.log(err);}

Bot.login(config.ClIENT_TOKEN);