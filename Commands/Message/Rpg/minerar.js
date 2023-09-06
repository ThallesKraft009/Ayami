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

    let userdb = await db.findOne({
         userID: message.author.id
     })
      
     if(!userdb){
         const newuser = new db({ userID: message.author.id })
         await newuser.save();
         
         userdb = await db.findOne({ userID: message.author.id })
  }
    
    let data = {};
    data.player = {};
    data.player.x = 0;
    data.player.y = 0;
    data.vida = userdb.rpg.vida;
    data.fome = 100;
    data.blocks = {};
    data.blocks.pedras = 0;
    data.blocks.carvao = 0;
    data.blocks.cobre = 0;
    data.blocks.ferro = 0;
    data.minerios = {};
    data.minerios.ferro = [];
    data.minerios.cobre = [];
    data.minerios.carvao = [];
    data.monstros = [];
    data.minerio_selecionado = "";
    data.personagem = `${userdb.skin}`;
    data.picaretas = {};
    data.picaretas.pedra = [];
    data.picaretas.cobre = [];
    data.picaretas.ferro = [];

    userdb.rpg.picaretas.pedra.map(x => {
      data.picaretas.pedra.push(x)
    })

    userdb.rpg.picaretas.cobre.map(x => {
      data.picaretas.cobre.push(x)
    })

    userdb.rpg.picaretas.ferro.map(x => {
      data.picaretas.ferro.push(x)
    })

    const embed = new EmbedBuilder()
    .setColor("Random")
    .setTitle("**Exploração de Caverna**")
    .setFooter({
      text: `${data.player.y}, ${data.player.x}`,
      iconURL: `${message.author.displayAvatarURL()}`
    })
    .setTimestamp()

        

    if (userdb.uid === null || userdb.uid === "Não definido") return message.reply({
            content: "Espera um minutinho... Você não salvou seu uid! Use **`mw!salvar-uid`** pra salvar!",
            ephemeral: true
          })

    let mundo = userdb.rpg.mundo;
      if (mundo === null) return message.reply({
        content: `Espera um minutinho..... Você ainda não criou seu mundo! Uss **\`mw!criar-mundo\`** <:chinelada:826103654201163826>`,
        ephemeral: true
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

        data.monstros.push({
          x: gerarNumeroAleatorio(1, 11),
          y: gerarNumeroAleatorio(1, 11)
        });

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

      data.monstros.map(mob => {
        data.mapa[0][mob.y][mob.x] = "z";
      })

        data.mapa[0][data.player.y][data.player.x] = "a";
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

      data.monstros.map(mob => {
        data.mapa[0][mob.y][mob.x] = "z";
      })

      data.mapa[0][data.player.y][data.player.x] = "a";

    }

    const pvp = async(mob, i) => {

      let botao_pvp = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel("Atacar Zumbie")
        .setCustomId("attack_zumbie")
        .setEmoji("🗡️")
        .setStyle(ButtonStyle.Secondary)
      );

      await i.deferUpdate();
        await i.editReply({
        embeds: [],
        components: [botao_pvp],
        content: `🗡️ | Você achou um Zombie na caverna, ataque antes que você morra!`
      });

    const tempoLimite = 10000;
    let tempoDecorrido = 0;

      
    const intervalo = setInterval(() => {
        const tempoDecorrido = Date.now() - i.createdTimestamp;

      

        if (tempoDecorrido >= 9000) {
            clearInterval(intervalo);

            const vidaAtual = data.player.vida;
            const armadura = data.player.armadura;
          const indiceZumbi = data.monstros.findIndex(zumbi => zumbi.x === mob.x && zumbi.y === mob.y);
    if (indiceZumbi !== -1) {
        data.monstros.splice(indiceZumbi, 1);
    }

            let vidaPerdida;

            if (armadura <= 0) {
              
                vidaPerdida = 10; 
            } else {
                vidaPerdida = 5; 
                data.player.armadura -= 1;
            }

            data.player.vida -= vidaPerdida; 

            if (data.player.vida <= 0) {
                
                return i.editReply({
                  content: "Você morreu na caverna!",
                  components: [],
                  embeds: []
                })
            } else {

                         gerar_mapa();

           minerar();

           mapaString = data.mapa.map(row => row.map(elementoParaString).join("")).join("").replace(/(\S{12})/g, '$1\n');

        embed.setDescription(`Pedras: **\`${data.blocks.pedras}\`**\nCarvão: **\`${data.blocks.carvao}\`**\nCobre: **\`${data.blocks.cobre}\`**\nFerro: **\`${data.blocks.ferro}\`**\n\n${mapaString.replace("a", data.personagem).replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>")}`);

           embed.setFooter({
      text: `${12 - data.player.y}, ${data.player.x}`,
      iconURL: `${message.author.displayAvatarURL()}`
    })

  //            i.deferUpdate();

              

              i.editReply({
                embeds: [embed],
              content: `${message.author} | Você não consegui atacar o Zombie e perdeu ${vidaPerdida} de vida!`,
              components: [botoes]
            })

              
            }
        }
    }, 1000); 

      

      Collector(async(int) => {
        if (int.isButton()){
          if (int.customId === "attack_zumbie"){

            clearInterval(intervalo);

const indiceZumbi = data.monstros.findIndex(zumbi => zumbi.x === mob.x && zumbi.y === mob.y);
    if (indiceZumbi !== -1) {
        data.monstros.splice(indiceZumbi, 1);
              }

           gerar_mapa();

           minerar();

           mapaString = data.mapa.map(row => row.map(elementoParaString).join("")).join("").replace(/(\S{12})/g, '$1\n');

        embed.setDescription(`Pedras: **\`${data.blocks.pedras}\`**\nCarvão: **\`${data.blocks.carvao}\`**\nCobre: **\`${data.blocks.cobre}\`**\nFerro: **\`${data.blocks.ferro}\`**\n\n${mapaString.replace("a", data.personagem).replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>")}`);

           embed.setFooter({
      text: `${12 - data.player.y}, ${data.player.x}`,
      iconURL: `${message.author.displayAvatarURL()}`
    })

            await int.deferUpdate()
            
            int.editReply({
              embeds: [embed],
              content: `${message.author}`,
              components: [botoes]
            })
          }
        }
      })

      try {
    setTimeout(() => {
        clearInterval(intervalo); 
    }, tempoLimite);

      } catch (err) {
        let n_sei;
      }
}
    

let menu_picaretas = new ActionRowBuilder()
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

    

    
    gerar_mapa();
    gerar_minerios();

    
    

    let mapaString = data.mapa.map(row => row.map(elementoParaString).join("")).join("").replace(/(\S{12})/g, '$1\n');
    

    embed.setDescription(`Pedras: **\`${data.blocks.pedras}\`**\nCarvão: **\`${data.blocks.carvao}\`**\nCobre: **\`${data.blocks.cobre}\`**\nFerro: **\`${data.blocks.ferro}\`**\n\n${mapaString.replace("a", data.personagem).replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>")}`);

    //➡️    ⬅️    ⬇️   ⬆️


        


    let msg = await message.reply({
      embeds: [embed],
      components: [botoes]
    })
    
    Collector(async(i) => {
       if (i.isButton()){
         if (i.customId === "minerar-➡️"){

              if (i.message.id !== msg.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })

           data.player.x = data.player.x +1;
           if (data.player.x === 11) data.player.x = 11;

           

           gerar_mapa();

           minerar();

           mapaString = data.mapa.map(row => row.map(elementoParaString).join("")).join("").replace(/(\S{12})/g, '$1\n');

        embed.setDescription(`Pedras: **\`${data.blocks.pedras}\`**\nCarvão: **\`${data.blocks.carvao}\`**\nCobre: **\`${data.blocks.cobre}\`**\nFerro: **\`${data.blocks.ferro}\`**\n\n${mapaString.replace("a", data.personagem).replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>")}`);

           embed.setFooter({
      text: `${12 - data.player.y}, ${data.player.x}`,
      iconURL: `${message.author.displayAvatarURL()}`
    })

let mob_perto = obterCoordenadasDosMonstrosProximos(data);

           if (mob_perto.value === true){
              return pvp(mob_perto, i);
           }

                      let tipoMinerio = verificarMinerio(data);

           data.minerio_selecionado = tipoMinerio;

if (tipoMinerio === "carvão"){

  i.update({
             embeds: [embed],
             components: [botoes, menu_picaretas]
           })
                                     
} else if (tipoMinerio === "cobre"){

  i.update({
             embeds: [embed],
             components: [botoes, menu_picaretas]
           })
  
} else if (tipoMinerio === "ferro") {

  i.update({
             embeds: [embed],
             components: [botoes, menu_picaretas]
           })
} else if (tipoMinerio === "nenhum"){

  i.update({
             embeds: [embed],
             components: [botoes]
           })
  
}
         }

   if (i.customId === "minerar-⬅️"){

     if (i.message.id !== msg.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })
     
                data.player.x = data.player.x-1;
           if (data.player.x === -1) data.player.x = 0;

           

           gerar_mapa();

           minerar();

           mapaString = data.mapa.map(row => row.map(elementoParaString).join("")).join("").replace(/(\S{12})/g, '$1\n');

    
    embed.setDescription(`Pedras: **\`${data.blocks.pedras}\`**\nCarvão: **\`${data.blocks.carvao}\`**\nCobre: **\`${data.blocks.cobre}\`**\nFerro: **\`${data.blocks.ferro}\`**\n\n${mapaString.replace("a", data.personagem).replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>")}`);

     embed.setFooter({
      text: `${12 - data.player.y}, ${data.player.x}`,
      iconURL: `${message.author.displayAvatarURL()}`
    })

     let mob_perto = obterCoordenadasDosMonstrosProximos(data);

           
     if (mob_perto.value === true){
              return pvp(mob_perto, i);
     }
     
    let tipoMinerio = verificarMinerio(data);
     data.minerio_selecionado = tipoMinerio;

if (tipoMinerio === "carvão"){

  i.update({
             embeds: [embed],
             components: [botoes, menu_picaretas]
           })
                                     
} else if (tipoMinerio === "cobre"){

  i.update({
             embeds: [embed],
             components: [botoes, menu_picaretas]
           })
  
} else if (tipoMinerio === "ferro") {

  i.update({
             embeds: [embed],
             components: [botoes, menu_picaretas]
           })
} else if (tipoMinerio === "nenhum"){

  i.update({
             embeds: [embed],
             components: [botoes]
           })
  
}
   }

   if (i.customId === "minerar-⬇️"){

     if (i.message.id !== msg.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })
     
                data.player.y = data.player.y +1;
           if (data.player.y === 11) data.player.y = 11;

           

           gerar_mapa();

     minerar();
           mapaString = data.mapa.map(row => row.map(elementoParaString).join("")).join("").replace(/(\S{12})/g, '$1\n');

        embed.setDescription(`Pedras: **\`${data.blocks.pedras}\`**\nCarvão: **\`${data.blocks.carvao}\`**\nCobre: **\`${data.blocks.cobre}\`**\nFerro: **\`${data.blocks.ferro}\`**\n\n${mapaString.replace("a", data.personagem).replace("r", "<:emoji_9:1125762523753357322>").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>")}`);

     embed.setFooter({
      text: `${12 - data.player.y}, ${data.player.x}`,
      iconURL: `${message.author.displayAvatarURL()}`
    })

     let mob_perto = obterCoordenadasDosMonstrosProximos(data);

           
     if (mob_perto.value === true){
              return pvp(mob_perto, i);
           }
     
      let tipoMinerio = verificarMinerio(data);

     

     data.minerio_selecionado = tipoMinerio;

if (tipoMinerio === "carvão"){

  i.update({
             embeds: [embed],
             components: [botoes, menu_picaretas]
           })
                                     
} else if (tipoMinerio === "cobre"){

  i.update({
             embeds: [embed],
             components: [botoes, menu_picaretas]
           })
  
} else if (tipoMinerio === "ferro") {

  i.update({
             embeds: [embed],
             components: [botoes, menu_picaretas]
           })
} else if (tipoMinerio === "nenhum"){

  i.update({
             embeds: [embed],
             components: [botoes]
           })
  
}
   }

         if (i.customId === "minerar-⬆️"){

           if (i.message.id !== msg.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })
           
                      data.player.y = data.player.y-1;
           if (data.player.y === -1) data.player.y = 0;

           

           gerar_mapa();
minerar();
           mapaString = data.mapa.map(row => row.map(elementoParaString).join("")).join("").replace(/(\S{12})/g, '$1\n');

        embed.setDescription(`Pedras: **\`${data.blocks.pedras}\`**\nCarvão: **\`${data.blocks.carvao}\`**\nCobre: **\`${data.blocks.cobre}\`**\nFerro: **\`${data.blocks.ferro}\`**\n\n${mapaString.replace("a", data.personagem).replace("r", "<:emoji_9:1125762523753357322>").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("z", "🧟‍♂️").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("r", "<:emoji_9:1125762523753357322>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("c", "<:emoji_20:1147904118661337119>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>").replace("f", "<:emoji_21:1147904147434242128>")}`);

           embed.setFooter({
      text: `${12 - data.player.y}, ${data.player.x}`,
      iconURL: `${message.author.displayAvatarURL()}`
    })

           let mob_perto = obterCoordenadasDosMonstrosProximos(data);

           if (mob_perto.value === true){
              return pvp(mob_perto, i);
           }
           
           let tipoMinerio = verificarMinerio(data);

data.minerio_selecionado = tipoMinerio;

if (tipoMinerio === "carvão"){


  i.update({
             embeds: [embed],
             components: [botoes, menu_picaretas]
           })
                                     
} else if (tipoMinerio === "cobre"){

  i.update({
             embeds: [embed],
             components: [botoes, menu_picaretas]
           })
  
} else if (tipoMinerio === "ferro") {

  i.update({
             embeds: [embed],
             components: [botoes, menu_picaretas]
           })
} else if (tipoMinerio === "nenhum"){

  i.update({
             embeds: [embed],
             components: [botoes]
           })
  
}

           
           
         }
       }

  if (i.isStringSelectMenu()){
      if (i.customId === "minerar_escolher_p"){
        if (i.message.id !== msg.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })
        
        let value = i.values[0];

        /** 
        1 = pedra
        2 = cobre
        3 = ferro
        **/

        if (value === 1){

          let picareta = userdb.rpg.picaretas.pedra;

          if (!picareta || picareta.length < 0) return i.reply({
            content: `Espere um minuto.. Você não tem uma picareta de pedra!`,
            ephemeral: true
          })

          picareta = picareta[0];

          picareta = picareta - 5;

          if (data.minerio_selecionado === "carvão"){
              data.minerios.carvao = data.minerios.carvao+1;

          }

          if (data.minerio_selecionado === "cobre"){

              data.minerios.cobre = data.minerios.cobre+1;

            
          }

          
        }
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

  function verificarMinerio(data) {
    const playerX = data.player.x;
    const playerY = data.player.y;
    
    for (const minerio of data.minerios.ferro) {
        if (playerX === minerio.x && playerY === minerio.y) {
            return "ferro";
        }
    }
    
    for (const minerio of data.minerios.carvao) {
        if (playerX === minerio.x && playerY === minerio.y) {
            return "carvão";
        }
    }
    
    for (const minerio of data.minerios.cobre) {
        if (playerX === minerio.x && playerY === minerio.y) {
            return "cobre";
        }
    }

    return "nenhum";
}

function obterCoordenadasDosMonstrosProximos(data) {
    const playerX = data.player.x;
    const playerY = data.player.y;
    
    const coordenadasDosMonstrosProximos = [];
    
    for (const monstro of data.monstros) {
        const monstroX = monstro.x;
        const monstroY = monstro.y;
        
        const diferencaX = Math.abs(playerX - monstroX);
        const diferencaY = Math.abs(playerY - monstroY);
        
        if ((diferencaX === 2 && diferencaY === 0) || (diferencaX === 0 && diferencaY === 2)) {
            coordenadasDosMonstrosProximos.push({ x: monstroX, y: monstroY });
        }
    }
    
    if (coordenadasDosMonstrosProximos.length > 0) {
        return {
            value: true,
            coordenadasDosMonstrosProximos
        };
    } else {
        return {
            value: false,
            coordenadasDosMonstrosProximos: []
        };
    }
          }           