export const removeTrigger = (trigger: RegExp, content: string): string => {
  return content.replace(trigger, '').trim();
};
