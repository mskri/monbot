import { Client } from 'discord.js';
import { onReady } from './events';

type BotConfig = {
  authToken: string;
};

export const Monbot = ({ authToken }: BotConfig) => {
  const client = new Client();

  client.on('ready', () => onReady(client));

  client.login(authToken);
};
