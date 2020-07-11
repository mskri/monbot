import { createCommand, Message } from 'monbot';

export const channelId = createCommand({
  trigger: /^!channel-id/,
  run: function (message: Message) {
    message.channel.send(`ID for this channel is \`${message.channel.id}\``);
  },
});
