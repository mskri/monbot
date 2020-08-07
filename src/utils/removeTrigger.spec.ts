import { removeTrigger } from './removeTrigger';

describe('removeTrigger', () => {
  it('removes trigger from content string', () => {
    expect(removeTrigger(/hello\s/i, 'hello ')).toEqual('');
    expect(removeTrigger(/hello\s/i, 'hello')).toEqual('hello');
    expect(removeTrigger(/hello\s/i, 'hellotogether')).toEqual('hellotogether');
    expect(removeTrigger(/hello\s/i, 'beforehello')).toEqual('beforehello');
    expect(removeTrigger(/hello\s/i, 'hellohello')).toEqual('hellohello');
    expect(removeTrigger(/hello\s/i, 'word before hello and after')).toEqual(
      'word before and after'
    );
  });
});
