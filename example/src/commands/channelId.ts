import { createCommand } from 'monbot';

export const channelId = createCommand({
  name: 'channel-id',
  trigger: /^!channel-id/,
  run: function ({ channel, content, guild }, { removeTrigger }) {
    const channelName = removeTrigger(content);
    const channelLinkRegExp = /^<#[0-9]+>/;

    if (channelName.length < 1) {
      channel.send(`You need to specify which channel`);
      return;
    }

    const channelId =
      guild?.channels?.cache.find((ch) => {
        if (channelLinkRegExp.test(channelName)) {
          const channelId = channelName.replace(/[^0-9]/g, '');
          return ch.id === channelId;
        }
        return ch.name.toLowerCase() === channelName.trim().toLowerCase();
      })?.id ?? null;

    if (!channelId) {
      channel.send(`Unkown channel **${channelName}**`);
      return;
    }

    channel.send(`Channel ID for **${channelName}** is \`${channelId}\``);
  },
});
