import { createCommand, Message } from 'monbot';
import { stripTrigger } from './commandUtils';
import { Role } from 'discord.js';

export const roleId = createCommand({
  trigger: /^!role-id/,
  run: function (message: Message) {
    const content = stripTrigger(this.trigger, message.content);

    if (content.length < 1) {
      message.channel.send(`You need to specify which role to look for`);
      return;
    }

    const role = message.guild?.roles.cache.find(
      (role) => role.name.toLowerCase() === content.toLowerCase()
    );

    message.channel.send(`ID for role "${content}" is \`${role?.id}\``);
  },
});
