import { ClusterManager } from 'discord-hybrid-sharding'
import c from 'colors';

const manager = new ClusterManager(`index.js`, {
    totalShards: 15,
    shardsPerClusters: 5,
    totalClusters: 3,
    mode: 'process',
    token: process.env.token,
});

manager.on('clusterCreate', cluster => console.log(c.blue(`Launched Cluster ${cluster.id}`)));
manager.spawn({ timeout: -1 });