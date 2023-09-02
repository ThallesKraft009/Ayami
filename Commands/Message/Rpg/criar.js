import { PermissionFlagsBits, AttachmentBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputStyle, TextInputBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder } from "discord.js";

import Collector from '../../../functions/collector.js';

import db from '../../../mongodb/user.js';

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "criar",
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

    if (userdb.uid === null || userdb.uid === "Não definido") return message.reply({
            content: "Espera um minutinho... Você não salvou seu uid! Use **`mw!salvar-uid`** pra salvar!",
            ephemeral: true
          })

    let mundo = userdb.rpg.mundo;
      if (mundo === null) return message.reply({
        content: `Espera um minutinho..... Você ainda não criou seu mundo! Uss **\`mw!criar-mundo\`** <:chinelada:826103654201163826>`,
        ephemeral: true
      })

    let file = new AttachmentBuilder("image/criar.png");

    let select_menu = new ActionRowBuilder()
      .addComponents(
    new StringSelectMenuBuilder()
			.setCustomId('criar-itens')
			.setPlaceholder('Cartegorias')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Geral')
					.setDescription('Clique pra selecionar')
					.setValue('1'),
        new StringSelectMenuOptionBuilder()
					.setLabel('Ferramentas')
					.setDescription('Clique pra selecionar')
					.setValue('2'),
        new StringSelectMenuOptionBuilder()
					.setLabel('Armaduras')
					.setDescription('Clique pra selecionar')
					.setValue('3'),
        new StringSelectMenuOptionBuilder()
					.setLabel('Armas')
					.setDescription('Clique pra selecionar')
					.setValue('4'),
			)
    )

    let msg = await message.reply({
      content: `${message.author}`,
      files: [file],
      components: [select_menu]
    })

  Collector(async(i) => {
    if (i.isStringSelectMenu()){
      if (i.customId === "criar-itens"){
        let value = i.values[0];

        if (value === "1"){

          let buttons = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
            .setLabel("Graveto")
            .setCustomId("criar-graveto")
            .setStyle(ButtonStyle.Secondary)
          )

          await i.update({
            components: [buttons, select_menu]
          })
        } else if (value === "2"){
          let buttons = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
            .setLabel("Picareta de Pedra")
            .setCustomId("criar-picareta-pedra")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setLabel("Picareta de Cobre")
            .setCustomId("criar-picareta-cobre")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setLabel("Picareta de Ferro")
            .setCustomId("criar-picareta-ferro")
            .setStyle(ButtonStyle.Secondary)
          )

          await i.update({
            components: [buttons, select_menu]
          })
        } else if (value === "3"){
          let buttons = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
            .setLabel("Armadura de Cobre")
            .setCustomId("criar-armadura-cobre")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setLabel("Armadura de Ferro")
            .setCustomId("criar-armadura-ferro")
            .setStyle(ButtonStyle.Secondary)
          )

          await i.update({
            components: [buttons, select_menu]
          })
        }
      }
    }
  })
    
  },
};

