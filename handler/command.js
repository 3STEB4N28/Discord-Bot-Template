const {readdirSync} = require("fs")

module.exports = (Bot) =>{
    readdirSync('./Commands/').forEach(dir=>{
        const commands = readdirSync(`./Commands/${dir}/`).filter(f=> f.endsWith('.js')); 
            for(let file of commands){
                let pull = require(`../../Commands/${dir}/${file}`);
                if(pull.name){
                    Bot.commands.set(pull.name,pull);
                    if(pull.aliases)
                pull.aliases.forEach(alias => Bot.aliases.set(alias,pull.name))
                }else{
                    console.log(`❌ A name is not present in ${file}`)
                    continue;
                }
                
            }
        });
}
