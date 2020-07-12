import { Client, Message } from 'discord.js';
import { BotConfig } from './bot';

export const onReady = async (client: Client) => {
  if (!client.user) {
    throw Error('No user');
  }

  const { username: botUsername, id: botId } = client.user;
  console.log(`Logged in as ${botUsername} (${botId})`);
  console.log(`Reporting for duty!`);
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
    command.run(message);
    return;
  }
};
