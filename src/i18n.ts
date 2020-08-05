import en from './locales/en.json';

export const t = (key: string, ...parameters: (string | number)[]): string => {
  const locale = en as Record<string, string>;
  const translation = locale[key] as string;

  if (parameters.length > 0) {
    let index = 0;

    return translation.replace(/\${[\w._]+}/g, () => {
      const filledTranslation = parameters[index] as string;
      index++;
      return filledTranslation;
    });
  }

  return translation;
};
