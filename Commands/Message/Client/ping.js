import { PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "ping",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

  let gatewayPing = client.ws.ping;
    
    let apiPing = Date.now() - message.createdTimestamp;

    

    return message.reply({
      content: "Ping?"
    }).then(async(x) => {
      x.edit({
        content: `🏓 Pong!\n⏰ | Gateway Ping: **\`${gatewayPing}ms\`**\n⚡ | API Ping: **\`${apiPing}ms\`**`
      })
    })
  },
};
