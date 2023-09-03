import { PermissionFlagsBits, AttachmentBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputStyle, TextInputBuilder, EmbedBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder } from "discord.js";

import Collector from '../../../functions/collector.js';

import db from '../../../mongodb/user.js';

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "minerar",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

    
    
    let data = {};
  
    data.mapa_pronto = "";
    data.player = {};
    data.player.x = 0;
    data.player.y = 0;
    data.blocks = {};
    data.blocks.pedras = 0;
    data.blocks.carvao = 0;
    data.blocks.cobre = 0;
    data.blocks.ferro = 0;
    data.minerios = {};
    data.minerios.ferro = [];
    data.minerios.cobre = [];
    data.minerios.carvao = [];
    data.minerio_selecionado = "";

    const embed = new EmbedBuilder()
    .setColor("Random")
    .setTitle("**Exploração de Caverna**")
    .setFooter({
      text: `${data.player.y}, ${data.player.x}`,
      iconURL: `${message.author.displayAvatarURL()}`
    })

        let botoes = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                    .setEmoji("⬅️")
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId("minerar-⬅️"),
      new ButtonBuilder()
                    .setEmoji("⬆️")
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId("minerar-⬆️"),
                    new ButtonBuilder()
                    .setEmoji("⬇️")
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId("minerar-⬇️"),
   new ButtonBuilder()
                    .setEmoji("➡️")
                 .setStyle(ButtonStyle.Secondary)
                    .setCustomId("minerar-➡️")
                    )

    const gerar_mapa = async() => {
data.mapa = [
  [[], [], [], [], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], [], [], [], []],
      ];

      for (let y = 0; y < 12; y++) {
        for (let x = 0; x < 12; x++) {
          let num = y * 12 + x + 1;
          data.mapa[0][y][x] = "⬛";
        }
      }



    data.mapa[0][data.player.y][data.player.x] = "a";
    }

    const gerar_minerios = async() => {
      for (let minerios = 0; minerios < 3; minerios++){

  data.minerios.carvao.push({
    x: gerarNumeroAleatorio(1, 11),
    y: gerarNumeroAleatorio(1, 11)
  })

  data.minerios.carvao.push({
    x: gerarNumeroAleatorio(1, 11),
    y: gerarNumeroAleatorio(1, 11)
  })

  data.minerios.carvao.push({
    x: gerarNumeroAleatorio(1, 11),
    y: gerarNumeroAleatorio(1, 11)
  })
      

  data.minerios.cobre.push({
    x: gerarNumeroAleatorio(1, 11),
    y: gerarNumeroAleatorio(3, 11)
  })

  data.minerios.ferro.push({
    x: gerarNumeroAleatorio(1, 11),
    y: gerarNumeroAleatorio(8, 11)
  })

  data.minerios.carvao.map(ore => {
        data.mapa[0][ore.y][ore.x] = "c";
        
      })

      data.minerios.cobre.map(ore => {
        data.mapa[0][ore.y][ore.x] = "r";
      })
      

      data.minerios.ferro.map(ore => {
        data.mapa[0][ore.y][ore.x] = "f";
      })
}
}

    const minerar = async(embed) => {
      data.blocks.pedras = data.blocks.pedras+1

      data.minerios.carvao.map(ore => {
        data.mapa[0][ore.y][ore.x] = "c";
        
      })

      data.minerios.cobre.map(ore => {
        data.mapa[0][ore.y][ore.x] = "r";
      })
      

      data.minerios.ferro.map(ore => {
        data.mapa[0][ore.y][ore.x] = "f";
      })

    }

    

/*let menu_picaretas = new ActionRowBuilder()
  .addComponents(
    new StringSelectMenuBuilder()
			.setCustomId('minerar_escolher_p')
			.setPlaceholder('Escolha a Picareta')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Picareta de Pedra')
					.setDescription('Clique pra selecionar')
					.setValue('1'),
        new StringSelectMenuOptionBuilder()
					.setLabel('Picareta de Cobre')
					.setDescription('Clique pra selecionar')
					.setValue('2'),
        new StringSelectMenuOptionBuilder()
					.setLabel('Picareta de Ferro')
					.setDescription('Clique pra selecionar')
					.setValue('3'),
        )
      )
*/
    

    
    gerar_mapa();
    gerar_minerios();

    
    

    let mapaString = data.mapa.map(row => row.map(elementoParaString).join("")).join("").replace(/(\S{12})/g, '$1\n');
    

    embed.setDescription(`Pedras: **\`${data.blocks.pedras}\`**\nCarvão: **\`${data.blocks.carvao}\`**\nCobre: **\`${data.blocks.cobre}\`**\nFerro: **\`${data.blocks.ferro}\`**\n\n${mapaString.replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("a", "🍮").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>")}`);

    //➡️    ⬅️    ⬇️   ⬆️


        


    let msg = await message.reply({
      embeds: [embed],
      components: [botoes]
    })
    console.log(data)
    Collector(async(i) => {
       if (i.isButton()){
         if (i.customId === "minerar-➡️"){

           data.player.x = data.player.x +1;
           if (data.player.x === 11) data.player.x = 11;

           

           gerar_mapa();

           minerar();

           mapaString = data.mapa.map(row => row.map(elementoParaString).join("")).join("").replace(/(\S{12})/g, '$1\n');

        embed.setDescription(`Pedras: **\`${data.blocks.pedras}\`**\nCarvão: **\`${data.blocks.carvao}\`**\nCobre: **\`${data.blocks.cobre}\`**\nFerro: **\`${data.blocks.ferro}\`**\n\n${mapaString.replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("a", "🍮").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>")}`);

           embed.setFooter({
      text: `${12 - data.player.y}, ${data.player.x}`,
      iconURL: `${message.author.displayAvatarURL()}`
    })

           i.update({
             embeds: [embed],
             componentes: [botoes]
           })
         }

   if (i.customId === "minerar-⬅️"){
                data.player.x = data.player.x-1;
           if (data.player.x === -1) data.player.x = 0;

           

           gerar_mapa();

           minerar();

           mapaString = data.mapa.map(row => row.map(elementoParaString).join("")).join("").replace(/(\S{12})/g, '$1\n');

    
    embed.setDescription(`Pedras: **\`${data.blocks.pedras}\`**\nCarvão: **\`${data.blocks.carvao}\`**\nCobre: **\`${data.blocks.cobre}\`**\nFerro: **\`${data.blocks.ferro}\`**\n\n${mapaString.replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("a", "🍮").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>")}`);

     embed.setFooter({
      text: `${12 - data.player.y}, ${data.player.x}`,
      iconURL: `${message.author.displayAvatarURL()}`
    })

           
           i.update({
             embeds: [embed],
             componentes: [botoes]
           })
   }

   if (i.customId === "minerar-⬇️"){
                data.player.y = data.player.y +1;
           if (data.player.y === 11) data.player.y = 11;

           

           gerar_mapa();

     minerar();
           mapaString = data.mapa.map(row => row.map(elementoParaString).join("")).join("").replace(/(\S{12})/g, '$1\n');

        embed.setDescription(`Pedras: **\`${data.blocks.pedras}\`**\nCarvão: **\`${data.blocks.carvao}\`**\nCobre: **\`${data.blocks.cobre}\`**\nFerro: **\`${data.blocks.ferro}\`**\n\n${mapaString.replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("a", "🍮").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>")}`);

     embed.setFooter({
      text: `${12 - data.player.y}, ${data.player.x}`,
      iconURL: `${message.author.displayAvatarURL()}`
    })
     
           i.update({
             embeds: [embed],
             componentes: [botoes]
           })
   }

         if (i.customId === "minerar-⬆️"){
                      data.player.y = data.player.y-1;
           if (data.player.y === -1) data.player.y = 0;

           

           gerar_mapa();
minerar();
           mapaString = data.mapa.map(row => row.map(elementoParaString).join("")).join("").replace(/(\S{12})/g, '$1\n');

        embed.setDescription(`Pedras: **\`${data.blocks.pedras}\`**\nCarvão: **\`${data.blocks.carvao}\`**\nCobre: **\`${data.blocks.cobre}\`**\nFerro: **\`${data.blocks.ferro}\`**\n\n${mapaString.replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("a", "🍮").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>")}`);

           embed.setFooter({
      text: `${12 - data.player.y}, ${data.player.x}`,
      iconURL: `${message.author.displayAvatarURL()}`
    })

           i.update({
             embeds: [embed],
             componentes: [botoes]
           })
           
         }
       }
    })
    
  },
};

function elementoParaString(elemento) {
  return elemento.map(arr => arr[0]).join("");
      }


  function gerarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }