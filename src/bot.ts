import { Client, Message } from 'discord.js';
import { onReady, onError, onMessage } from './events';
import { Command } from './command';

export type BotConfig = {
  commands: Command[];
};

export const Monbot = (authToken: string, config: BotConfig) => {
  const client = new Client();

  client.on('ready', () => onReady(client));
  client.on('error', (error: Error) => onError(error));
  client.on('message', (message: Message) =>
    onMessage(config, client, message)
  );

  client.login(authToken);
};
