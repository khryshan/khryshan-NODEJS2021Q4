import { jest } from '@jest/globals';

const mockProcessExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
const mockProcessError = jest.spyOn(process.stderr, 'write').mockImplementation(() => {});

export { mockProcessExit, mockProcessError };
