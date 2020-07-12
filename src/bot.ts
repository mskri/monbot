import { Client, Message, Snowflake } from 'discord.js';
import { onReady, onError, onMessage } from './events';
import { Command } from './command';

export type BotConfig = {
  admins: Snowflake[];
  commands: Command[];
};

export const Monbot = (authToken: string, botConfig: BotConfig) => {
  const client = new Client();

  client.on('ready', () => onReady(client));
  client.on('error', (error: Error) => onError(error));
  client.on('message', (message: Message) => onMessage({ botConfig, client, message }));

  client.login(authToken);
};
