import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-markdown', () => {
  return function ReactMarkdownMock({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

test('renders the portfolio shell', () => {
  render(<App />);
  const linkElement = screen.getByText(/shyam s\. suthar/i);
  expect(linkElement).toBeTruthy();
});
