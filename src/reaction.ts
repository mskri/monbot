import { Snowflake, MessageReaction, User, Client } from 'discord.js';

export type Reaction = {
  name: string;
  trigger: string | string[];
  onAdd?: (reaction: MessageReaction, { user, client }: { user: User; client: Client }) => void;
  onRemove?: (reaction: MessageReaction, { user, client }: { user: User; client: Client }) => void;
  requiredRoles?: Snowflake[];
  channels?: Snowflake[];
  guilds?: Snowflake[];
};

export const createReaction = (reaction: Reaction): Reaction => {
  return reaction;
};
