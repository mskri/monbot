import { Message } from 'discord.js';

export type Command = {
  trigger: RegExp;
  run: (message: Message) => void;
};

export const createCommand = (command: Command): Command => {
  return command;
};
