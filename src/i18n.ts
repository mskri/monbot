import en from './locales/en.json';

const placeholderRegExp = /\${[\w._]+}/g;

export const t = (key: string, ...params: (string | number | null | undefined)[]): string => {
  const locale = en as Record<string, string>;
  const translation = locale[key] as string;

  if (!translation) {
    throw new ReferenceError(`Could not find translation for '${key}'`);
  }

  const placeholders: RegExpMatchArray = translation.match(placeholderRegExp) ?? [];

  if (placeholders.length !== params.length) {
    throw new Error(
      `Number of given params does not match with number of placeholders in translation. Expected to receive ${placeholders.length}, got ${params.length}`
    );
  }

  if (params.length > 0) {
    let index = 0;

    return translation.replace(placeholderRegExp, () => {
      const filledTranslation = params[index] as string;
      index++;
      return filledTranslation;
    });
  }

  return translation;
};
