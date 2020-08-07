import { parseArgs } from './parseArgs';

describe('parseArgs', () => {
  it('parses string into object', () => {
    expect(
      parseArgs(
        '--first --second "is a string" --third false --fourth "2020-02-01 12:34:55+02:00" --fifth 123'
      )
    ).toEqual({
      args: {
        _: [
          '--first',
          '--second',
          'is a string',
          '--third',
          'false',
          '--fourth',
          '2020-02-01 12:34:55+02:00',
          '--fifth',
          '123',
        ],
        first: true,
        second: 'is a string',
        third: false,
        fourth: new Date('2020-02-01 12:34:55+02:00'),
        fifth: 123,
      },
      hasMissingArgs: false,
      missingArgs: [],
    });
  });

  it('parses string into object with default values', () => {
    expect(
      parseArgs('--title "This is title"', {
        defaults: { description: 'This is default description' },
      })
    ).toEqual({
      args: {
        _: ['--title', 'This is title'],
        title: 'This is title',
        description: 'This is default description',
      },
      hasMissingArgs: false,
      missingArgs: [],
    });
  });

  it('parses string into object and returns missing required args', () => {
    expect(
      parseArgs('--title "This is title"', {
        requiredArgs: ['description'],
      })
    ).toEqual({
      args: {
        _: ['--title', 'This is title'],
        title: 'This is title',
      },
      hasMissingArgs: true,
      missingArgs: ['description'],
    });
  });
});
