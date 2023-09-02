import { Colors } from "discord.js";

const settings = {
  TOKEN: process.env.token || "Bot_Token",
  PREFIX: "mw!",
  Owners: [""],
  Slash: {
    Global: true,
    GuildID: process.env.GuildID || "1134057488518500374",
  },
  embed: {
    color: Colors.Blurple,
    wrongColor: Colors.Red,
  },
  emoji: {
    success: "✅",
    error: "❌",
    fada_da_lua: "<:fadadalua:1147585547620057140>",
    kaka: "<:kaka:1147585577298972745>",
    lynn: "<:lynn:1147585604436099152>",
    misra: "<:misra:1147585636623196290>"
  },
};

export default settings;
