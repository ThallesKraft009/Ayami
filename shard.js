import {ShardingManager} from 'discord.js';
import c from 'colors';

const manager = new ShardingManager('./index.js', {
  token: process.env.token, 
  totalShards: 1
});

manager.on('shardCreate', async(shard) => {
  console.log(c.blue(`Shard "${shard.id}" was started.`))
});

export default manager;

manager.spawn();