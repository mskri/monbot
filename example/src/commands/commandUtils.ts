export const stripTrigger = (trigger: RegExp, content: string): string => {
  return content.replace(trigger, '').trim();
};
