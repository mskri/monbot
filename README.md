# Monbot

A library with simple API for creating your own discord bots.

> :warning: Not recommended for use yet. Under development and api is still shaping up.

## Installation

Install using `npm install --save monbot discord.js` or `yarn add monbot discord.js`.

## Quickstart

Monbot makes it easier to create discord bots with custom commands. Here's quick example:

```ts
import { Monbot, createCommand } from 'monbot';

// Create a command that is triggered when word "hello" is found in the message, e.g. "Hello friend!"
const hello = createCommand({
  name: 'hello',
  trigger: /(^|\s+)hello(\s+|$)/i,
  run: ({ channel }) => {
    channel.send('hi 👋');
  },
});

// Initialise the bot
Monbot('BOT_AUTH_TOKEN', {
  commands: [hello],
});
```

You can find expanded example from [`example/`](./example/)

## Bot permissions in discord

For bot to work with adding or removing reactions to messages that are not in its cache, e.g. messages send before bot became online, it requires `Read Message History` permission.

Without the permission bot cannot fetch non-cached messages and the reactions will not trigger the action.

## API documentation

### `Monbot`

TBA

### `createCommand`

Creates a command configuration.

```ts
type Command = {
  name: string;
  trigger: RegExp;
  run: (message: Message, { removeTrigger, parseArgs }: CommandExtraParams) => void;
  requiredRoles?: string[];
  adminOnly?: boolean;
  channels?: string[];
  guilds?: string[];
};
```

| Field           | Description                                                                                                                          |
| :-------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `name`          | Name of the command. Displayed in logs                                                                                               |
| `trigger`       | Regular expression that triggers the command                                                                                         |
| `run`           | Function to run when command is triggered                                                                                            |
| `requiredRoles` | [Role IDs](https://discord.js.org/#/docs/main/stable/class/Role?scrollTo=id) user is required to have to run the command             |
| `adminOnly`     | Is user required to be listed as admin in `BotConfig`                                                                                |
| `channels`      | [Channel IDs](https://discord.js.org/#/docs/main/stable/class/TextChannel?scrollTo=id) for channels the command is allowed be run in |
| `guilds`        | [Guild IDs](https://discord.js.org/#/docs/main/stable/class/Guild?scrollTo=id) for servers the command is allowed be run in          |

#### Example

```ts
export const hello = createCommand({
  name: 'hello',
  trigger: /(^|\s+)hello(\s+|$)/i,
  run: ({ channel }) => {
    channel.send('hi 👋');
  },
});
```

### `createReaction`

Creates a reaction configuration.

```
type Reaction = {
  name: string;
  trigger: string | string[];
  onAdd?: (reaction: MessageReaction) => void;
  onRemove?: (reaction: MessageReaction) => void;
  requiredRoles?: string[];
  channels?: string[];
  guilds?: string[];
};
```

| Field           | Description                                                                                                                                                         |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`          | Name of the command. Displayed in logs                                                                                                                              |
| `trigger`       | Emoji name that triggers reaction. Discord's default emoji names are like 😄or 👍. Custom emojis name's are the same as their alias in server settings, e.g. `woah` |
| `onAdd`         | Function to run when reaction is added                                                                                                                              |
| `onRemove`      | Function to run when reaction is removed                                                                                                                            |
| `requiredRoles` | [Role IDs](https://discord.js.org/#/docs/main/stable/class/Role?scrollTo=id) user is required to have to run the command                                            |
| `channels`      | [Channel IDs](https://discord.js.org/#/docs/main/stable/class/TextChannel?scrollTo=id) for channels the command is allowed be run in                                |
| `guilds`        | [Guild IDs](https://discord.js.org/#/docs/main/stable/class/Guild?scrollTo=id) for servers the command is allowed be run in                                         |

#### Example

```ts
export const wave = createReaction({
  name: 'wave',
  trigger: ['👋'],
  onAdd: ({ message: { channel } }) => {
    channel.send('You added :wave:');
  },
  onRemove: function ({ message: { channel } }) {
    channel.send('You removed :wave:');
  },
});
```
