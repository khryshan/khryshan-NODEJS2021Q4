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

describe('check the getConfig() method (Success scenarios)', () => {
  test('user passes correct sequence of symbols as argument for --config', () => {
    const args = ['-c', 'C1-C1-R0-A', '-i', './input.txt', '-o', './output.txt'];
    const result = { params: 'C1-C1-R0-A', input: './input.txt', output: './output.txt'};

    expect(getConfig(args)).toEqual(result);
  });

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

describe('check the getConfig() method (Error scenarios)', () => {
  beforeEach(() => {
    mockProcessError.mockClear();
    mockProcessExit.mockClear();
  });

  test('user does not pass -c or --config argument (no arguments)', () => {
    getConfig([]);
    expect(mockProcessError).toHaveBeenCalledWith("ERROR: Config option is required! Try use '-c' or '--config'");
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });

  test('user does not pass -c or --config argument', () => {
    const args = ['-i', './input.txt', '-o', './output.txt'];

    getConfig(args);
    expect(mockProcessError).toHaveBeenCalledWith("ERROR: Config option is required! Try use '-c' or '--config'");
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });

  test('user passes the same cli argument twice (e.g. -c)', () => {
    const args = ['-c', 'A-R0', '-i', './input.txt', '-o', './output.txt', '-c', 'A-R0'];

    getConfig(args);
    expect(mockProcessError).toHaveBeenCalledWith("ERROR: Check your config. Perhaps, there are duplicates of configurations.");
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });

  test('user passes the same cli argument twice (e.g. -c and --config)', () => {
    const args = ['-c', 'A-R0', '-i', './input.txt', '-o', './output.txt', '--config', 'A-R0'];

    getConfig(args);
    expect(mockProcessError).toHaveBeenCalledWith("ERROR: Check your config. Perhaps, there are duplicates of configurations.");
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });

  test('user passes the same cli argument twice (e.g. -i)', () => {
    const args = ['-c', 'A-R0', '-i', './input.txt', '-o', './output.txt', '-i', './input2.txt'];

    getConfig(args);
    expect(mockProcessError).toHaveBeenCalledWith("ERROR: Check your config. Perhaps, there are duplicates of configurations.");
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });

  test('user passes the same cli argument twice (e.g. -o)', () => {
    const args = ['-c', 'A-R0', '-i', './input.txt', '-o', './output.txt', '-o', './output2.txt'];

    getConfig(args);
    expect(mockProcessError).toHaveBeenCalledWith("ERROR: Check your config. Perhaps, there are duplicates of configurations.");
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });

  test('user passes -i argument with path that does not exist', () => {
    const args = ['-c', 'A-R0', '-i', './no-exist-input-file.txt'];

    getConfig(args);
    expect(mockProcessError).toHaveBeenCalledWith("ERROR: Check your input file path");
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });

  test('user passes -i argument with path with no read access', () => {
    const args = ['-c', 'A-R0', '-i', ''];

    getConfig(args);
    expect(mockProcessError).toHaveBeenCalledWith("ERROR: Check your input file path");
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });

  test('user passes -o argument with path to directory that does not exist or with no read access', () => {
    const args = ['-c', 'A-R0', '-o', './no-exist-output-file.txt'];

    getConfig(args);
    expect(mockProcessError).toHaveBeenCalledWith("ERROR: Check your output file path");
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });

  test('user passes -o argument with path to directory with no read access', () => {
    const args = ['-c', 'A-R0', '-o', ''];

    getConfig(args);
    expect(mockProcessError).toHaveBeenCalledWith("ERROR: Check your output file path");
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });

  test('user passes incorrent symbols in argument for --config', () => {
    const args = ['-c', 'A-R0-W'];

    getConfig(args);
    expect(mockProcessError).toHaveBeenCalledWith("ERROR: Check your config.");
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });

  test('user does not finish passing the symbols in argument for --config', () => {
    const args = ['-c', 'A-R0-'];

    getConfig(args);
    expect(mockProcessError).toHaveBeenCalledWith("ERROR: Complete your config.");
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });
});

