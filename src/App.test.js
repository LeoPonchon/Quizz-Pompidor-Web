import { render, screen } from '@testing-library/react';
import App from './App';

test('renders theme selection screen', () => {
  render(<App />);
  expect(screen.getByText(/Choisis un mode/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Quiz Pompidor/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Ing.*logicielle/i })).toBeDisabled();
});
