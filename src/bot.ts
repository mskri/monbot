import { Client } from 'discord.js';
import { onReady, onError } from './events';

type BotConfig = {
  authToken: string;
};

export const Monbot = ({ authToken }: BotConfig) => {
  const client = new Client();

  client.on('ready', () => onReady(client));
  client.on('error', (error: Error) => onError(error));

  client.login(authToken);
};
