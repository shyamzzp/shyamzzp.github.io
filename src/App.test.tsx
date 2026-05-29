import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-markdown', () => {
  return function ReactMarkdownMock({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

beforeEach(() => {
  Object.defineProperty(window, 'fetch', {
    writable: true,
    value: jest.fn(() => new Promise(() => {})),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the portfolio shell', () => {
  render(<App />);
  const linkElement = screen.getByText(/shyam s\. suthar/i);
  expect(linkElement).toBeTruthy();
});

test('renders only the scrollable resume pages in the right panel', () => {
  render(<App />);

  expect(
    screen.getByTitle(/shyam suthar resume preview/i)
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('heading', { name: /resume preview/i })
  ).not.toBeInTheDocument();
  expect(screen.queryByText(/open pdf/i)).not.toBeInTheDocument();
  expect(
    screen.queryByText(/current pdf resume displayed/i)
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('heading', { name: /projects \| case studies \| blogs/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('heading', { name: /active github repositories/i })
  ).not.toBeInTheDocument();
});
