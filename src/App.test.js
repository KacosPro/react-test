import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { parseResponse } from './App';
import { families, members } from './mockData'

describe('App component', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByText('Table Exercise')).toBeInTheDocument();
  });
})

describe('Parser function', () => {
  const parsedResponse = parseResponse(families, members);
  const family = parsedResponse[0];
  
  it('Returns an array', () => {
    const isArray = Array.isArray(parsedResponse);
    expect(isArray).toBe(true);
  });

  it('Has an element with an "ID" property', () => {
    expect(family).toHaveProperty('id')
  });

  it('Has an element with a "name" property', () => {
    expect(family).toHaveProperty('name')
  });

  it('Has an element with a "members" property', () => {
    expect(family).toHaveProperty('members')
  });

  it('Has an element with a "members" property and this element is an array', () => {
    const isArray = Array.isArray(family.members);
    expect(isArray).toBe(true);
  });
})