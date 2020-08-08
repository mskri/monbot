declare global {
  interface String {
    indexOfRegex(regexp: RegExp): number;
  }
}

String.prototype.indexOfRegex = function (regex: RegExp) {
  const match = this.match(regex);
  return match ? this.indexOf(match[0]) : -1;
};

const findMissingArgs = (args: Record<string, unknown>, requiredKeys: string[]): string[] => {
  const missingKeys: string[] = [];

  requiredKeys.forEach((key: string) => {
    if (!args.hasOwnProperty(key)) missingKeys.push(key);
  });

  return missingKeys;
};

// Converts the value to boolean/number if they can be otherwise returns them as string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertIfApplicable = (value: any): string | number | boolean | Date => {
  if (isNaN(value)) {
    const isBooleanTrue = value.toLowerCase() === 'true';
    const isBooleanFalse = value.toLowerCase() === 'false';
    const isDate = !isNaN(new Date(value).getTime());

    if (isBooleanTrue) return true;
    if (isBooleanFalse) return false;
    if (isDate) return new Date(value);
  } else {
    return Number(value);
  }

  return value;
};

// Removes any number of hyphens from the beginning of string
const removeStartHyphens = (value: string): string => value.replace(/^\-+/g, '');

// Turns string into process.arg like array of arguments
const processargvify = (input: string): string[] => {
  // Adapted from https://github.com/jimmycuadra/shellwords/blob/master/src/shellwords.coffee
  //
  // \s*                       # Leading whitespace
  // (?:                       #
  //     ([^\s\\\'\"]+)        # Normal words
  //     |                     #
  //     '((?:[^\'\\]|\\.)*)'  # Text inside single quotes
  //     |                     #
  //     "((?:[^\"\\]|\\.)*)"  # Text inside double quotes
  //     |                     #
  //     (\\.?)                # Escaped character
  //     |                     #
  //     (\S)                  # Garbage
  // )                         #
  // (\s|$)?
  const regExp = /\s*(?:([^\s\\\'\"]+)|'((?:[^\'\\]|\\.)*)'|"((?:[^\"\\]|\\.)*)"|(\\.?)|(\S))(\s|$)?/;
  return input
    .split(regExp)
    .filter((o) => o) // Filter out undefined and nulls
    .filter((o) => o.trim().length > 0); // Filter out blanks and spaces
};

export type ParsedArgs<T> = {
  args: T;
  hasMissingArgs: boolean;
  missingArgs: string[];
};

export type ParseArgsOptions = {
  defaults?: Record<string, unknown>;
  requiredArgs?: string[];
};

export const parseArgs = <T extends Record<string, string | number | boolean | Date>>(
  input: string,
  opts: ParseArgsOptions = {}
): ParsedArgs<T> => {
  const { defaults, requiredArgs } = opts;
  const argKeyRegExp = /^--\w+/;
  const inputArgs = processargvify(input.trim());
  const props: Record<string, string | boolean | number | Date> = {};

  for (let i = 0; i < inputArgs.length; i++) {
    const current = inputArgs[i];
    const next = inputArgs[i + 1];
    const argName = removeStartHyphens(current);

    if ((next && next.indexOfRegex(argKeyRegExp) >= 0) || !next) {
      // If next is already a new argKey then current argKey value is boolean
      // also if next one is null while current is argKey it means that current
      // argKey is boolean because we are at the end of the string
      props[argName] = true;
    } else if (next && current.indexOfRegex(argKeyRegExp) >= 0) {
      props[argName] = convertIfApplicable(next);
      i++;
    }
  }

  const args = Object.assign({ _: inputArgs }, defaults ?? {}, props) as T;
  const missingArgs = findMissingArgs(args, requiredArgs ?? []);

  return {
    args: args,
    hasMissingArgs: missingArgs.length > 0,
    missingArgs,
  };
};
