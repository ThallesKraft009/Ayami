import { PermissionFlagsBits, AttachmentBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputStyle, TextInputBuilder, EmbedBuilder } from "discord.js";

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

    const embed = new EmbedBuilder()
    .setColor("Random")
    
    let data = {};
  
    data.mapa_pronto = "";
    data.player = {};
    data.player.x = 0;
    data.player.y = 0;

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

    data.mapa[0][data.player.y][data.player.x] = "a"
    }

    gerar_mapa();

    const mapaString = data.mapa.map(row => row.map(elementoParaString).join("")).join("").replace(/(\S{12})/g, '$1\n');

    embed.setDescription(mapaString.replace("a", "🍮"));
    //➡️    ⬅️    ⬇️   ⬆️



    let msg = await message.reply({
      embeds: [embed],
      components: [new ActionRowBuilder()
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
                  )]
    })
    
    
    
  },
};

function elementoParaString(elemento) {
  return elemento.map(arr => arr[0]).join("");
      }