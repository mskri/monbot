import { Collection, Role } from 'discord.js';

// TODO: requires changes if dms are allowed to trigger commands
export const triggeredInDisallowedGuild = (
  allowedGuilds: string[] | undefined,
  guildId: string | undefined
): boolean => {
  return allowedGuilds ? !allowedGuilds.some((id) => id === guildId) : false;
};

export const triggeredInDisallowedChannel = (
  allowedChannels: string[] | undefined,
  channelName: string
): boolean => {
  return allowedChannels ? !allowedChannels.some((name) => name === channelName) : false;
};

export const authorDoesNotHaveRequiredRole = (
  requiredRoles: string[] | undefined,
  memberRoles: Collection<string, Role> | undefined
): boolean => {
  return requiredRoles
    ? !requiredRoles.every((role) => memberRoles?.get(role) !== undefined)
    : false;
};
