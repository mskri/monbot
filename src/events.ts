import { Client } from 'discord.js';

export const onReady = async (client: Client) => {
  if (!client.user) {
    throw Error('No user');
  }

  const { username: botUsername, id: botId } = client.user;
  console.log(`Logged in as ${botUsername} (${botId})`);
  console.log(`Reporting for duty!aa`);
};
