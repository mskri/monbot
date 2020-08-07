import { createCommand } from 'monbot';

export const channelId = createCommand({
  name: 'channel-id',
  trigger: /^!channel-id/,
  run: function ({ channel }) {
    channel.send(`ID for this channel is \`${channel.id}\``);
  },
});
