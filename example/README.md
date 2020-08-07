# Example bot with Monbot

## Command documentation

### `hello`

Triggers bot to respond with a message when it detects word "hello" in a message.

```
Hello bot
```

### `admin`

Triggers bot to respond with a message when it detects word "admin" in a message. Requires you to be an admin for bot to respond.

```
I am admin
```

### `!channel-id <channel name>`

Returns ID of the given channel name. Channel name can be with or without `#`.

```
!channel-id test
!channel-id #test
```

### `!emoji-id`

Returns ID of the given custom emoji.

```
!emoji-id :custom:
```

### `!role-id`

Returns ID of the given role.

```
!role-id Members
```
