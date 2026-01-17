import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainApp } from './MainApp';
import { Provider } from 'react-redux';
import { store } from '../../store';

test('renders without crashing', () => {
  render(
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
});
