# Changelog

## v0.1.13

- Add client to onAdd and onRemove events

## v0.1.12

- Revert "Ignore reaction add/remove events triggered by bots". The change made reactions on messages posted by bots not trigger `onAdd` or `onRemove`

## v0.1.11

- Ignore reaction add/remove events triggered by bots

## v0.1.10

- Add user to reactions onAdd and onRemove

## v0.1.9

- Move all rollup plugins to devDependencies to remove warning on installation

## v0.1.8

- Add `createReaction` API for triggering commands on adding or removing reactions
- Make passing commands to Monbot configuration optional
- Remove required roles, channels and guild from examples

## v0.1.7

- Fix parseArgs using defaults value instead if given one

## v0.1.5

- Change discord.js to peerDependencies

## v0.1.4

- Moved pino to dependencies to fix missing dependency

## v0.1.3

- Fix word triggers to work in a sentence. Was not triggering if there was not space after the trigger word

## v0.1.2

- Change setting bot admins to be optional

## v0.1.1

- Initial `createCommand` API
- Project setup
