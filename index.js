const Discord = require('discord.js');
const dotenv = require('dotenv');
const { prefix } = require('./config.json');
const client = new Discord.Client();

dotenv.config();

client.once('ready', () => {
    console.log('Ready!');
    //const channel = client.channels.cache.get("802102602112172042");
    //if (!channel) return console.error("The channel does not exist!");
    // channel.join().then(connection => {
    // Yay, it worked!
    //  console.log("Successfully connected.");
    //  }).catch(e => {

    // Oh no, it errored! Let's log it to console :)
    // console.error(e);
    //  });
});

client.login(process.env.TOKEN);

client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => { // Listeing to the voiceStateUpdate event
    let oldVoice = oldVoiceState.channelID;
    let newVoice = newVoiceState.channelID;
    if (oldVoice != newVoice) {
        if (oldVoice == null) {
            console.log("User joined!");
            if (newVoiceState.member.user.id === "677900913381212191") {
                var VC = newVoiceState.member.voice.channel;
                if (!VC)
                    return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
                VC.join()
                    .then(connection => {
                        dispatcher = connection.play(require("path").join(__dirname, './sounds/je_suis_gay.mp3'), { volume: 1 });
                        dispatcher.on("finish", end => {
                            console.log("Bot left")
                            VC.leave()
                            //message.reply("JE ME CASSE PETITE ...")
                        });
                    })
                    .catch(console.error);

            }
        } else if (newVoice == null) {
            console.log("User left!");
        } else {
            if (newVoiceState.member.user.id === "677900913381212191") {
                var VC = newVoiceState.member.voice.channel;
                if (!VC)
                    return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
                VC.join()
                    .then(connection => {
                        dispatcher = connection.play(require("path").join(__dirname, './sounds/je_suis_gay.mp3'), { volume: 1 });
                        dispatcher.on("finish", end => {
                            console.log("Bot left")
                            VC.leave()
                            //message.reply("JE ME CASSE PETITE ...")
                        });
                    })
                    .catch(console.error);

            }
            console.log("User switched channels!");
        }
    } else if (oldVoiceState.channel) { // The member disconnected from a channel.
        console.log(`${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`)
    };
});

client.on('message', message => {

    if (message.content.includes("bite")) {
        message.channel.send('Etienne et Nary son des genies ! Mais parlent que de ZIZI');
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (message.content.startsWith(`${prefix}ping`)) {
        message.channel.send('Pong.');
    }
    else if (message.content === `${prefix}server`) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    }
    else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }
    else if (command === 'kick') {
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to kick them!');
        }
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        const taggedUser = message.mentions.users.first();

        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    }
    else if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
        });

        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
    }
    else if (command === "tududu") {
        var VC = message.member.voice.channel;

        if (!VC)
            return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
        VC.join()
            .then(connection => {
                dispatcher = connection.play(require("path").join(__dirname, './sounds/kaamelott-trompette.mp3'), { volume: 1 });
                dispatcher.on("end", end => { VC.leave() });
            })
            .catch(console.error);
    };

});

