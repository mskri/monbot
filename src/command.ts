import { Message, Snowflake } from 'discord.js';
import type { ParsedArgs, ParseArgsOptions } from './parseArgs';

export type CommandExtraParams = {
  removeTrigger: (content: string) => string;
  parseArgs: <T extends Record<string, string | number | boolean | Date>>(
    input: string,
    opts?: ParseArgsOptions
  ) => ParsedArgs<T>;
};

export type Command = {
  name: string;
  trigger: RegExp;
  run: (message: Message, { removeTrigger, parseArgs }: CommandExtraParams) => void;
  requiredRoles?: Snowflake[];
  adminOnly?: boolean;
  channels?: Snowflake[];
  guilds?: Snowflake[];
};

export const createCommand = (command: Command): Command => {
  return command;
};
