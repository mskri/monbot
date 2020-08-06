export const replaceTrigger = (trigger: RegExp, content: string): string => {
  return content.replace(trigger, '').trim();
};
