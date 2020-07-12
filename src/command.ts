import { Message } from 'discord.js';

export type Command = {
  name: string;
  trigger: RegExp;
  run: (message: Message) => void;
};

export const createCommand = (command: Command): Command => {
  return command;
};
