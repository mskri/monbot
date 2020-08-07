import { createCommand } from 'monbot';

export const roleId = createCommand({
  name: 'role-id',
  trigger: /^!role-id/,
  run: function ({ channel, guild }, { content }) {
    if (content.length < 1) {
      channel.send(`You need to specify which role to look for`);
      return;
    }

    const roleId =
      guild?.roles.cache.find((role) => {
        return role.name.toLowerCase() === content.toLowerCase();
      })?.id ?? null;

    if (!roleId) {
      channel.send(`Unkown role **${content}**`);
      return;
    }

    channel.send(`ID for role **${content}** is \`${roleId}\``);
  },
});
