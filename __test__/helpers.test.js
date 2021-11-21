import {
  checkIsConfig,
  checkDuplicate,
  showError,
  getConfig,
  updateArgs
} from '../src/helper.js';
import { mockProcessError, mockProcessExit } from './mocks/errors.js';

describe('check if the configuration exists (method checkIsConfig())', () => {
  test('there is the alias of config flag (-c)', () => {
    expect(checkIsConfig('-c')).toBeTruthy();
  });

  test('there is the empty item', () => {
    expect(checkIsConfig('')).toBeFalsy();
  });

  test('undefined passed as an argument', () => {
    expect(checkIsConfig(undefined)).toBeFalsy();
  });
});

describe('check if there is a dublicate (method checkDuplicate())', () => {
  test('there is not a dublicate (empty array)', () => {
    expect(checkDuplicate([])).toBeFalsy();
  });

  test('there is not a dublicate', () => {
    expect(checkDuplicate(['-c', '-i', '-o'])).toBeFalsy();
  });

  test('there is a dublicate', () => {
    expect(checkDuplicate(['-c', '-i', '-c'])).toBeTruthy();
  });
})

describe('check the updateArgs() method', () => {
  test('update arguments, when there are -c and --config', () => {
    const args = ['-c', 'C1', '-i', './input.txt', '--config', 'A-R0',];
    const modArgs = ['-c', 'C1', '-i', './input.txt', '-c', 'A-R0',];

    expect(updateArgs(args)).toEqual(modArgs);
  });

  test('update arguments, when there are -i and --input', () => {
    const args = ['-i', './input.txt', '--input', './input2.txt'];
    const modArgs = ['-i', './input.txt', '-i', './input2.txt'];

    expect(updateArgs(args)).toEqual(modArgs);
  });

  test('update arguments, when there are -o and --output', () => {
    const args = ['-o', './output.txt', '--output', './output2.txt'];
    const modArgs = ['-o', './output.txt', '-o', './output2.txt'];

    expect(updateArgs(args)).toEqual(modArgs);
  });

  test('there is not update', () => {
    const args = ['-c', 'C1', '-i', './input.txt', '-o', './output.txt'];
    const modArgs = ['-c', 'C1', '-i', './input.txt', '-o', './output.txt'];

    expect(updateArgs(args)).toEqual(modArgs);
  });

  test('empty array', () => {
    expect(updateArgs([])).toEqual([]);
  });
});

describe('check the showError() method', () => {
  test('throw error with message', () => {
    showError("ERROR");
    expect(mockProcessError).toHaveBeenCalledWith('ERROR');
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  })
})

describe('check the getConfig() method', () => {
  test('there is all correct arguments', () => {
    const args = ['-c', 'C1', '-i', './input.txt', '-o', './output.txt'];
    const result = { params: 'C1', input: './input.txt', output: './output.txt'};

    expect(getConfig(args)).toEqual(result);
  });

  test('there is only cofig args', () => {
    const args = ['-c', 'C1-A'];
    const result = { params: 'C1-A', input: '', output: ''};

    expect(getConfig(args)).toEqual(result);
  });

  test('there is only cofig and input args', () => {
    const args = ['-c', 'C1-R0-A', '-i', './input.txt',];
    const result = { params: 'C1-R0-A', input: './input.txt', output: ''};

    expect(getConfig(args)).toEqual(result);
  });
});
