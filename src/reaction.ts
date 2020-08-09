import { Snowflake, MessageReaction } from 'discord.js';

export type Reaction = {
  name: string;
  trigger: string | string[]; // e.g. customemojiname or 😄
  onAdd?: (reaction: MessageReaction) => void;
  onRemove?: (reaction: MessageReaction) => void;
  requiredRoles?: Snowflake[];
  channels?: Snowflake[];
  guilds?: Snowflake[];
};

export const createReaction = (reaction: Reaction): Reaction => {
  return reaction;
};
