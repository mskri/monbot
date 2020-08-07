import { createCommand } from 'monbot';

export const roleId = createCommand({
  name: 'role-id',
  trigger: /^!role-id/,
  run: function ({ channel, guild }, { content }) {
    if (content.length < 1) {
      channel.send(`You need to specify which role to look for`);
      return;
    }

    const role = guild?.roles.cache.find(
      (role) => role.name.toLowerCase() === content.toLowerCase()
    );

    channel.send(`ID for role "${content}" is \`${role?.id}\``);
  },
});
