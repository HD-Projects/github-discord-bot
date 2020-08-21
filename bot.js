const Discord = require('discord.js');
const needle = require('needle');
var auth = require('./auth.json');
const fs = require('fs');
const botName = "Github";
const listener = '!';
const logo = "https://cdn.afterdawn.fi/v3/news/original/github-logo.png"
const following = require('./following.json');
// Initialize Discord Bot
let bot = new Discord.Client();
let content = "";
const websiteLink = "https://hdprojects.dev/";

// Invite Link 

// https://discord.com/oauth2/authorize?client_id=746374338575335454&scope=bot&permissions=3072

bot.login(auth.token);

function checkValue(value){
  if(value){
    return value;
  } else{
    return "Not Set";
  }
}

bot.on('message', function(message) {
  if(message.author.bot) return;
  if(!message.content.startsWith(listener)) return;

  let commandBody = message.content.slice(listener.length);
  let args = commandBody.split(' ');
  let command = args.shift().toLowerCase();
  console.log(command);
  switch (command){
    default:
      let defaultEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle("Unknown command")
      .setURL(websiteLink)
      .setAuthor(botName, logo,websiteLink )
      .addFields(
        { name: "\u200b", value: "Use "+listener+"help for list of commands", inline: true},
      )
      .setTimestamp()
      .setFooter('Made By HD Projects', 'https://hdprojects.dev/favicon.png');
      message.channel.send(defaultEmbed);
      break;
    case 'ping':
      let timeTaken = Date.now() - message.createdTimestamp;
      message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
      break;
    case 'help':
      let helpEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle("Help")
      .setURL(websiteLink)
      .setAuthor(botName, logo,websiteLink )
      .addFields(
        { name: listener+"ping", value: "Use to check the bot's ping time to see if it is up"},
        { name: listener+"user", value: "Use the user command to check information about a user !user ad101-lab to learn about the argument user"},
        { name: listener+"org", value: "Use org just like user to learn more information about a user"},
        { name: listener+"repo", value: "Use the repo command like !repo hd-projects/hd-projects.github.io to check on a that github repository."},
      )
      .setTimestamp()
      .setFooter('Made By HD Projects', 'https://hdprojects.dev/favicon.png');
      message.channel.send(helpEmbed);
      break;
    case 'user':
      let url = 'https://api.github.com/users/'+args[0];
      console.log(url);
      let arr = {
        hostname: 'api.github.com',
        path: '/users/'+args[0],
        headers: { 'User-Agent': 'Mozilla/5.0' }
      };
      needle.get(url, {json: true}, (err, res) => {
        if (err) {
          return console.log(err);
        }
        let user = toString(args[0]);
        let todo = res.body;
        if(todo.login){
          console.log(todo.login)
          let messageEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(todo.login+ "'s GitHub Profile")
            .setURL(todo.html_url)
            .setDescription("GitHub Account Bot")
            .setAuthor(botName, logo,websiteLink )
            .addFields(
              { name: "Username: ", value: todo.login, inline: true},
              { name: 'Website: ', value: checkValue(todo.blog), inline: true },)
              .addField('\u200b', '\u200b', true)
              .addFields(
              { name: "Followers:", value: checkValue(todo.followers) , inline: true },
              { name: "Following:", value: checkValue(todo.following) , inline: true },)
              .addField('\u200b', '\u200b', true)
              .addFields(
              { name: "# Of Public Repos:", value: checkValue(todo.public_repos) , inline: true },
              { name: "# Of Public Gists:", value: checkValue(todo.public_gists) , inline: true },)
              .addField('\u200b', '\u200b', true)
              .addFields(
              { name: "Email: ", value: checkValue(todo.email) , inline: true },
              { name: "Twitter: ", value: checkValue(todo.twitter_username) , inline: true },)
              .addField('\u200b', '\u200b', true)
              .addFields(
              { name: "Location: ", value: checkValue(todo.location) , inline: true },
              { name: "Hireable? ", value: checkValue(todo.hireable) , inline: true },)
              .addField('\u200b', '\u200b', true)
              .addFields(
              { name: "Created At:", value: checkValue(todo.created_at) , inline: true },
              { name: "Updated At:", value: checkValue(todo.created_at) , inline: true },
            )
            .setImage(todo.avatar_url)
            .setTimestamp()
            .setFooter('Made By HD Projects', 'https://hdprojects.dev/favicon.png').setURL();
          message.channel.send(messageEmbed);
        } else{
          let messageEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Account Not Found")
            .setURL(todo.html_url)
            .setAuthor(botName, logo,websiteLink )
            .addFields(
              { name: "Username: ", value: args[0], inline: true},
            )
            .setImage(todo.avatar_url)
            .setTimestamp()
            .setFooter('Made By HD Projects', 'https://hdprojects.dev/favicon.png');
          message.channel.send(messageEmbed);
        }
        // console.log('res: '+toString(res.body));
      });
      break;
    case 'org':
      let orgUrl = 'https://api.github.com/orgs/'+args[0];
      console.log(orgUrl);
      let orgArr = {
        hostname: 'api.github.com',
        path: '/users/'+args[0],
        headers: { 'User-Agent': 'Mozilla/5.0' }
      };
      needle.get(orgUrl, {json: true}, (err, res) => {
        if (err) {
          return console.log(err);
        }
        let org = toString(args[0]);
        let orgtodo = res.body;
        if(orgtodo.login){
          console.log(orgtodo.login)
          let messageEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(orgtodo.login+ "'s GitHub Profile")
            .setURL(orgtodo.html_url)
            .setDescription("GitHub Account Bot")
            .setAuthor(botName, logo,websiteLink )
            .addFields(
              { name: "Name: ", value: orgtodo.login, inline: true},
              { name: 'Website: ', value: checkValue(orgtodo.blog), inline: true },)
              .addField('\u200b', '\u200b', true)
              .addFields(
              { name: "Followers:", value: checkValue(orgtodo.followers) , inline: true },
              { name: 'Description: ', value: checkValue(orgtodo.description), inline: true },)
              .addField('\u200b', '\u200b', true)
              .addFields(
              { name: "# Of Public Repos:", value: checkValue(orgtodo.public_repos) , inline: true },
              { name: "# Of Public Gists:", value: checkValue(orgtodo.public_gists) , inline: true },)
              .addField('\u200b', '\u200b', true)
              .addFields(
              { name: "Email: ", value: checkValue(orgtodo.email) , inline: true },
              { name: "Twitter: ", value: checkValue(orgtodo.twitter_username) , inline: true },)
              .addField('\u200b', '\u200b', true)
              .addFields(
              { name: "Verified:", value: checkValue(orgtodo.is_verified) , inline: true },
              { name: 'Website: ', value: checkValue(orgtodo.blog), inline: true },)
              .addField('\u200b', '\u200b', true)
              .addFields(
              { name: "Created At:", value: checkValue(orgtodo.created_at) , inline: true },
              { name: "Updated At:", value: checkValue(orgtodo.updated_at) , inline: true },
            )
            .setImage(orgtodo.avatar_url)
            .setTimestamp()
            .setFooter('Made By HD Projects', 'https://hdprojects.dev/favicon.png');
          message.channel.send(messageEmbed);
        } else{
          let messageEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Organazation Not Found")
            .setURL(orgtodo.html_url)
            .setAuthor(botName, logo,websiteLink )
            .addFields(
              { name: "Org Name: ", value: args[0], inline: true},
            )
            .setImage(orgtodo.avatar_url)
            .setTimestamp()
            .setFooter('Made By HD Projects', 'https://hdprojects.dev/favicon.png');
          message.channel.send(messageEmbed);
        }
        // console.log('res: '+toString(res.body));
      });
      break;
    case 'repos':
      let repoUrl = "https://api.github.com/"+args[0]+"/repos/";
      console.log(repoUrl);
      let repoArr = {
        hostname: 'api.github.com',
        path: "/users/"+args[0]+"/repos/",
        headers: { 'User-Agent': 'Mozilla/5.0' }
      };
      
      needle.get(repoUrl, {json: true}, (err, res) => {
        if (err){
          let repoArr = {
            hostname: 'api.github.com',
            path: "/orgs/"+args[0]+"/repos/",
            headers: { 'User-Agent': 'Mozilla/5.0' }
          };
          needle.get(repoArr, {json: true}, (err, res) => {
            if(err){
              let repoEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Organazation Or User Not Found")
                .setURL(orgtodo.html_url)
                .setAuthor(botName, logo,websiteLink )
                .addFields(
                  { name: "Org or User Name: ", value: args[0], inline: true},
                )
                .setImage(orgtodo.avatar_url)
                .setTimestamp()
                .setFooter('Made By HD Projects', 'https://hdprojects.dev/favicon.png');
              message.channel.send(repoEmbed);
            }
            content = res.body;
            console.log(content);
          });
        }
        content = res.body;
        console.log(content);
      });
      break;
      case 'repo':
        let path = args[0];
        let reposUrl = "https://api.github.com/repos/"+args[0];
        console.log(reposUrl);
        let reposArr = {
          hostname: 'api.github.com',
          path: "/repos/"+args[0],
          headers: { 'User-Agent': 'Mozilla/5.0' }
        };
      
        //let content = "";
        needle.get(reposUrl, {json: true}, (err, res) => {
          if (err){
            
          }
          repostodo = res.body;
          console.log(repostodo);
          if(repostodo.owner){
            let reposEmbed = new Discord.MessageEmbed()
              .setColor('#0099ff')
              .setTitle(repostodo.name+ " Github Repository")
              .setURL(repostodo.html_url)
              .setDescription("GitHub Account Bot")
              .setAuthor(botName, logo,websiteLink )
              .addFields(
                { name: "Owner: ", value: repostodo.owner.login, inline: true},
                { name: 'Owner Type: ', value: checkValue(repostodo.owner.type), inline: true },)
                .addField('\u200b', '\u200b', true)
                .addFields(
                { name: "Launguage:", value: checkValue(repostodo.language) , inline: true },
                { name: "Enabled:", value: checkValue(repostodo.disabled) , inline: true },)
                .addField('\u200b', '\u200b', true)
                .addFields(
                { name: "Have a Wiki?:", value: checkValue(repostodo.has_wiki) , inline: true },
                { name: 'Has Github Pages: ', value: checkValue(repostodo.description), inline: true },)
                .addField('\u200b', '\u200b', true)
                .addFields(
                { name: "Open Issue Count:", value: checkValue(repostodo.open_issues_count) , inline: true },
                { name: "License:", value: checkValue(repostodo.license) , inline: true },)
                .addField('\u200b', '\u200b', true)
                .addFields(
                { name: "Clone URL: ", value: checkValue(repostodo.clone_url) , inline: true },
                { name: "Homepage: ", value: checkValue(repostodo.homepage) , inline: true },)
                .addField('\u200b', '\u200b', true)
                .addFields(
                  { name: "Created At:", value: checkValue(repostodo.created_at) , inline: true },
                  { name: 'Updated at: ', value: checkValue(repostodo.updated_at), inline: true },)
                  .addField('\u200b', '\u200b', true)
                .addFields(
                { name: "Fork Count:", value: checkValue(repostodo.forks) , inline: true },
                { name: "Default Branch:", value: checkValue(repostodo.default_branch) , inline: true },
              )
              .setImage(repostodo.avatar_url)
              .setTimestamp()
              .setFooter('Made By HD Projects', 'https://hdprojects.dev/favicon.png');
            message.channel.send(reposEmbed);
          } else{
            let errorEmbed = new Discord.MessageEmbed()
              .setColor('#0099ff')
              .setTitle("Repo Not Found")
              .setURL(websiteLink)
              .setAuthor(botName, logo,websiteLink )
              .addFields(
                { name: "Repo Name: ", value: args[0], inline: true},
              )
              .setTimestamp()
              .setFooter('Made By HD Projects', 'https://hdprojects.dev/favicon.png');
            message.channel.send(errorEmbed);
          }
        });  
  }
});
