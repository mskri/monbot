import { Message, Snowflake } from 'discord.js';
import type { ParsedArgs, ParseArgsOptions } from './parseArgs';

type CommandExtraParams = {
  content: string;
  parseArgs: <T extends Record<string, string | number | boolean | Date>>(
    input: string,
    opts?: ParseArgsOptions
  ) => ParsedArgs<T>;
};

export type Command = {
  name: string;
  trigger: RegExp;
  run: (message: Message, { content, parseArgs }: CommandExtraParams) => void;
  requiredRoles?: Snowflake[];
  adminOnly?: boolean;
  channels?: string[];
  guilds?: Snowflake[];
};

export const createCommand = (command: Command): Command => {
  return command;
};
