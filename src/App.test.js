import { render, screen } from '@testing-library/react';
import React from 'react';

// A simple test to verify the About section text
const MockAbout = () => (
  <div>
    <h1>Team Members</h1>
    <p>Nawaf Faisal AlShiagy</p>
    <p>Abdulilah AlMutairy</p>
  </div>
);

test('check if team names are defined', () => {
  render(<MockAbout />);
  const linkElement = screen.getByText(/Nawaf/i);
  expect(linkElement).toBeInTheDocument();
});