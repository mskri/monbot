import { Client, Message } from 'discord.js';
import { BotConfig } from './bot';
import { logger } from './logger';
import { triggeredInDisallowedGuild, authorDoesNotHaveRequiredRole } from './eventUtils';
import { t } from './i18n';
import { removeTrigger } from './utils/removeTrigger';
import { parseArgs } from './parseArgs';

export const onReady = async (client: Client) => {
  if (!client.user) {
    throw Error('No user');
  }

  const { username: botUsername, id: botId } = client.user;
  const guilds = client.guilds.cache.map((guild) => guild.name);

  logger.info(t('login.message', botUsername, botId));
  logger.info(t('login.activeGuilds', guilds.join(', ')));
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

  const authorIsNotAdmin = !botConfig.admins?.includes(author.id);

  if (command.adminOnly && authorIsNotAdmin) {
    logger.debug(t('errors.adminOnlyCommand', author.tag, command.name));
    return;
  }

  if (triggeredInDisallowedGuild(allowedGuilds, guild?.id)) {
    logger.debug(t('errors.disallowedGuildId', author.tag, command.name, guild?.name ?? 'unknown'));
    return;
  }

  if (triggeredInDisallowedGuild(allowedChannels, channel.name)) {
    logger.debug(t('errors.disallowedChannel', author.tag, command.name, channel.name));
    return;
  }

  if (authorDoesNotHaveRequiredRole(requiredRoles, member?.roles.cache)) {
    logger.debug(t('errors.authorMissingRequiredRole', author.tag, command.name));
    return;
  }

  logger.debug(t('commands.triggeredBy', command.name, author.tag));

  command.run(message, {
    removeTrigger: (content: string) => removeTrigger(command.trigger, content),
    parseArgs,
  });
};
