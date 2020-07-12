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

  if (!command) {
    return;
  }

  const { requiredRoles } = command;
  const { author, member } = message;

  const authorDoesNotHaveRequiredRole: boolean = requiredRoles
    ? !requiredRoles.every(
        (role) => member?.roles.cache.get(role) !== undefined
      )
    : false;

  if (authorDoesNotHaveRequiredRole) {
    logger.debug(
      `${author.tag} does not have required roles to run command '${command.name}'`
    );
    return;
  }

  logger.debug(`Command '${command.name}' was triggered by ${author.tag}`);

  command.run(message);
};
