import { Client, Message, Snowflake, MessageReaction, User, PartialUser } from 'discord.js';
import { onReady, onError, onMessage, onMessageReaction } from './events';
import { Command } from './command';
import { Reaction } from './reaction';

export type BotConfig = {
  commands?: Command[];
  reactions?: Reaction[];
  admins?: Snowflake[];
};

export const Monbot = (authToken: string, botConfig: BotConfig) => {
  const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  });

  client.on('ready', () => onReady(client));
  client.on('error', (error: Error) => onError(error));
  client.on('message', (message: Message) => onMessage({ botConfig, message }));
  client.on('messageReactionAdd', (reaction: MessageReaction, user: User | PartialUser) =>
    onMessageReaction({ botConfig, reaction, user, type: 'add' })
  );
  client.on('messageReactionRemove', (reaction: MessageReaction, user: User | PartialUser) =>
    onMessageReaction({ botConfig, reaction, user, type: 'remove' })
  );

  client.login(authToken);
};
