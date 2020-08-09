import { Client, Message, MessageReaction, User, PartialUser, Collection, Role } from 'discord.js';
import { BotConfig } from './bot';
import { logger } from './logger';
import { triggeredInDisallowedGuild, authorDoesNotHaveRequiredRole } from './eventUtils';
import { t } from './i18n';
import { removeTrigger } from './utils/removeTrigger';
import { parseArgs } from './parseArgs';
import { Reaction } from './reaction';

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

  const command = botConfig.commands?.find((command) => command.trigger.test(message.content));

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
    logger.debug(t('errors.disallowedGuildId', author.tag, command.name, guild?.name));
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

export const onMessageReactionAdd = async ({
  botConfig,
  reaction,
  user,
  type,
}: {
  botConfig: BotConfig;
  reaction: MessageReaction;
  user: User | PartialUser;
  type: 'add' | 'remove';
}) => {
  // Ignore bots
  if (user.bot) {
    return;
  }

  // Only allow channel messages for now
  if (reaction.message.channel.type !== 'text') {
    return;
  }

  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      logger.error(`Error fetching message: ${error.message}`);
      return;
    }
  }

  const reactionCommand = botConfig.reactions?.find((reactionCommand: Reaction) => {
    if (Array.isArray(reactionCommand.trigger)) {
      return reactionCommand.trigger.includes(reaction.emoji.name);
    }
    return reaction.emoji.name == reactionCommand.trigger;
  });

  if (!reactionCommand) {
    return;
  }

  const { requiredRoles, channels: allowedChannels, guilds: allowedGuilds } = reactionCommand;
  const { channel, guild, member } = reaction.message;

  if (triggeredInDisallowedGuild(allowedGuilds, guild?.id)) {
    logger.debug(t('errors.disallowedGuildId', user.tag, reactionCommand.name, guild?.name));
    return;
  }

  if (triggeredInDisallowedGuild(allowedChannels, channel.name)) {
    logger.debug(t('errors.disallowedChannel', user.tag, reactionCommand.name, channel.name));
    return;
  }

  if (authorDoesNotHaveRequiredRole(requiredRoles, member?.roles.cache)) {
    logger.debug(t('errors.authorMissingRequiredRole', user.tag, reactionCommand.name));
    return;
  }

  if (type === 'add') {
    logger.debug(
      t('reactions.onAddTriggeredBy', reactionCommand.name, user.tag, reaction.message.id)
    );
    reactionCommand.onAdd?.(reaction);
  } else {
    logger.debug(
      t('reactions.onRemoveTriggeredBy', reactionCommand.name, user.tag, reaction.message.id)
    );
    reactionCommand.onRemove?.(reaction);
  }
};
