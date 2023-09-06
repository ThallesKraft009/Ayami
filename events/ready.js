import { ActivityType } from "discord.js";
import { connect } from "mongoose"
import c from "colors"
/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "ready",

  run: async (client) => {
    console.log(c.green(`> ${client.user.tag} is Ready !!`));
    client.user.setActivity({
      name: `Arthur_32345 deixa thalles me desenvolver KKKKKKK`,
      type: ActivityType.Watching,
    });

    connect(process.env.mongo)

  },
};