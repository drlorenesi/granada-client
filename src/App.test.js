import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import App from './App';

test('renders login if not logged in', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <SessionProvider>
        <App />
      </SessionProvider>
    </MemoryRouter>
  );
  const linkElement = screen.getAllByText(/iniciar sesión/i);
  expect(linkElement.length).toEqual(2);
});
