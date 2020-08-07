import { createCommand } from 'monbot';

export const emojiId = createCommand({
  name: 'emoji-id',
  trigger: /^!emoji-id\s/,
  run: function ({ channel, content, guild }, { removeTrigger }) {
    const emoji = removeTrigger(content);

    const customEmojiRegExp = /<:\w+:[0-9]+>/;
    const customEmojiIdRegExp = /(?<=:)[0-9]+(?=>)/;
    const [customEmoji] = emoji.match(customEmojiRegExp) ?? [null];

    if (!customEmoji) {
      channel.send('No matching emoji found');
      return;
    }

    const [customEmojiId] = customEmoji.match(customEmojiIdRegExp) ?? [''];
    const matchingEmoji = guild?.emojis.resolve(customEmojiId);
    channel.send(
      `ID for custom emoji **${matchingEmoji?.name}** is \`${matchingEmoji?.id}\``
    );
  },
});
