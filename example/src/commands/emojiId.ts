import { createCommand } from 'monbot';

export const emojiId = createCommand({
  name: 'emoji-id',
  trigger: /^!emoji-id/,
  run: function ({ channel, guild }, { content }) {
    const customEmojiRegExp = /<:\w+:[0-9]+>/;
    const customEmojiIdRegExp = /(?<=:)[0-9]+(?=>)/;
    const [customEmoji] = content.match(customEmojiRegExp) ?? [null];

    if (customEmoji) {
      const [customEmojiId] = customEmoji.match(customEmojiIdRegExp) ?? [''];
      const emoji = guild?.emojis.resolve(customEmojiId);
      channel.send(`ID for custom emoji "${emoji?.name}" is \`${emoji?.id}\``);

      return;
    }

    channel.send('No matching emoji found');
  },
});
