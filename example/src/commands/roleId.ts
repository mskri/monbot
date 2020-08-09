import { createCommand } from 'monbot';

export const roleId = createCommand({
  name: 'role-id',
  trigger: /^!role-id\s/,
  run: ({ channel, content, guild }, { removeTrigger }) => {
    const role = removeTrigger(content);

    if (!role) {
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
