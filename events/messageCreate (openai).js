import { PermissionsBitField, codeBlock } from "discord.js";
import { cooldown } from "../handlers/functions.js";

import fetch from 'node-fetch'

/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "messageCreate",

  run: async (client, message) => {

  if (message.channel.type !== 0) return;
  if (message.author.bot) return;

  let prefix = "ayami";
  let msg = message.content.toLowerCase();

  if (!msg.startsWith(prefix)) return;
  if (!message.guild) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

let x = `Instruções: Isso é uma pergunta de um usuário do Discord. Caso esteja perguntando algo relacionado a Código (scripts, discord.js, programação em geral), apenas diga que não pode enviar códigos.\nPergunta: "${args.join("")}"`

  x = x.replace("@everyone", "")

  await message.channel.sendTyping();
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.openai}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ 
          role: 'system',
          content: 'Você é um assistente de conversação.'
        },{ 
          role: 'user',
          content: x
        }]
      })
    });

  const data = await response.json();
  
    const botReply = data.choices[0].message.content;

  const numeroQuebrasDeLinha = botReply.split("\n").length - 1;
  
  if (botReply.length > 550 || numeroQuebrasDeLinha > 5){
const thread = await message.startThread({
	name: `${args.join(" ")}`,
	autoArchiveDuration: 60,
	reason: 'response',
});
    
    thread.send({
      content: `${botReply}`
    })
  } else {
  message.reply({
    content: `${botReply}`
  })
  }
                    
  },
};

function escapeRegex(newprefix) {
  return newprefix?.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}