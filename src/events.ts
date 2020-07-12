import { Client, Message } from 'discord.js';
import { BotConfig } from './bot';
import { logger } from './logger';

export const onReady = async (client: Client) => {
  if (!client.user) {
    throw Error('No user');
  }

  const { username: botUsername, id: botId } = client.user;
  logger.info(`Logged in as ${botUsername} (${botId})`);
};

export const onError = (error: Error) => {
  console.error(`Unexpected error happened: ${error.message}`);
};

export const onMessage = async ({
  botConfig,
  client,
  message,
}: {
  botConfig: BotConfig;
  client: Client;
  message: Message;
}) => {
  // Ignore bots
  if (message.author.bot) {
    return;
  }

  // Only allow channel messages for now
  if (message.channel.type !== 'text') {
    return;
  }

  const command = botConfig.commands.find((command) =>
    command.trigger.test(message.content)
  );

  if (command) {
    logger.debug(
      `Command '${command.name}' was triggered by ${message.author.tag}`
    );
    command.run(message);
    return;
  }
};
