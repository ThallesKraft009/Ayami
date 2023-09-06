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

    let shard = message.guild.shardId;
    

    return message.reply({
      content: "Ping?"
    }).then(async(x) => {
      x.edit({
        content: `🏓 Pong! (Shard: ${shard}/15)(Cluster: ${client.cluster.id}/3)\n⏰ | Gateway Ping: **\`${gatewayPing}ms\`**\n⚡ | API Ping: **\`${apiPing}ms\`**`
      })
    })
  },
};