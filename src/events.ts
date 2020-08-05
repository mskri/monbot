import { Client, Message } from 'discord.js';
import { BotConfig } from './bot';
import { logger } from './logger';
import { triggeredInDisallowedGuild, authorDoesNotHaveRequiredRole } from './eventUtils';

export const onReady = async (client: Client) => {
  if (!client.user) {
    throw Error('No user');
  }

  const { username: botUsername, id: botId } = client.user;
  const guilds = client.guilds.cache.map((guild) => guild.name);

  logger.info(`Logged in as ${botUsername} (${botId})`);
  logger.info(`Active in following guilds: ${guilds.join(', ')}`);
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

  const command = botConfig.commands.find((command) => command.trigger.test(message.content));

  if (!command) {
    return;
  }

  const { requiredRoles, channels: allowedChannels, guilds: allowedGuilds } = command;
  const { author, channel, guild, member } = message;

  const authorIsNotAdmin = !botConfig.admins.includes(author.id);

  if (command.adminOnly && authorIsNotAdmin) {
    logger.debug(`${author.tag} tried to run admin only command '${command.name}'`);
    return;
  }

  if (triggeredInDisallowedGuild(allowedGuilds, guild?.id)) {
    logger.debug(
      `${author.tag} tried to run command '${command.name}' in a guild '${guild?.name}' which the command is not configured to be run in`
    );
    return;
  }

  if (triggeredInDisallowedGuild(allowedChannels, channel.name)) {
    logger.debug(
      `${author.tag} tried to run command '${command.name}' in a channel '#${channel.name}' which the command is not configured to be run in`
    );
    return;
  }

  if (authorDoesNotHaveRequiredRole(requiredRoles, member?.roles.cache)) {
    logger.debug(`${author.tag} does not have required roles to run command '${command.name}'`);
    return;
  }

  logger.debug(`Command '${command.name}' was triggered by ${author.tag}`);

  command.run(message);
};
