/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-mmkv', () => {
  return {
    createMMKV: jest.fn(() => ({
      getNumber: jest.fn(() => null),
      set: jest.fn(),
      getString: jest.fn(() => ''),
      clearAll: jest.fn(),
    })),
  };
});

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
