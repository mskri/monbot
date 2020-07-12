export const BOT_AUTH_TOKEN: string = process.env.BOT_AUTH_TOKEN ?? '';

// TODO: Should the admins be defined by their tag, e.g. user#1234, instead of 18 numbers long ID?
export const ADMINS: string[] = process.env.ADMINS?.split(',') ?? [];
