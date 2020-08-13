import { Snowflake, MessageReaction, User } from 'discord.js';

export type Reaction = {
  name: string;
  trigger: string | string[];
  onAdd?: (reaction: MessageReaction, user: User) => void;
  onRemove?: (reaction: MessageReaction, user: User) => void;
  requiredRoles?: Snowflake[];
  channels?: Snowflake[];
  guilds?: Snowflake[];
};

export const createReaction = (reaction: Reaction): Reaction => {
  return reaction;
};
