import { Message, Snowflake } from 'discord.js';

export type Command = {
  name: string;
  trigger: RegExp;
  run: (message: Message, { content }: { content: string }) => void;
  requiredRoles?: Snowflake[];
  adminOnly?: boolean;
  channels?: string[];
  guilds?: Snowflake[];
};

export const createCommand = (command: Command): Command => {
  return command;
};
