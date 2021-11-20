import { checkIsConfig, checkDuplicate, showError, getConfig } from '../src/helper.js';
import { mockProcessError, mockProcessExit } from './mocks/errors.js';

describe('check if the configuration exists (method checkIsConfig())', () => {
  test('there is the alias of config flag (-c)', () => {
    expect(checkIsConfig('-c')).toBeTruthy();
  });

  test('there is the full name of config flag (--config)', () => {
    expect(checkIsConfig('--config')).toBeTruthy();
  });

  test('there is the empty item', () => {
    expect(checkIsConfig('')).toBeFalsy();
  });

  test('there is the any other config flag (--config)', () => {
    expect(checkIsConfig('--inputg')).toBeFalsy();
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
