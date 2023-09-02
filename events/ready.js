import { ActivityType } from "discord.js";
import { connect } from "mongoose"

/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "ready",

  run: async (client) => {
    console.log(`> ${client.user.tag} is Ready !!`);
    client.user.setActivity({
      name: `Pudim`,
      type: ActivityType.Watching,
    });

    connect(process.env.mongo)
  },
};
