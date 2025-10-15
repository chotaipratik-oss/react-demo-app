import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { FetchData } from '../components/FetchData';

// Mock msGraphUsers data
const mockUsers = [
  { id: '1', displayName: 'Alice Smith', mail: 'alice@example.com' },
  { id: '2', displayName: 'Bob Jones', mail: 'bob@example.com' },
];

describe('FetchData - Search User', () => {
  it('should return valid users matching search text', () => {
    // Render component
    const { container } = render(<FetchData />);
    // Set msGraphUsers in state
    const instance = container.firstChild._owner.stateNode;
    instance.setState({ msGraphUsers: mockUsers });

    // Simulate search
    const results = instance._onFilterChanged('Alice', []);
    expect(results.length).toBe(1);
    expect(results[0].text).toBe('Alice Smith');
    expect(results[0].secondaryText).toBe('alice@example.com');
  });

  it('should return empty array for invalid user search', () => {
    const { container } = render(<FetchData />);
    const instance = container.firstChild._owner.stateNode;
    instance.setState({ msGraphUsers: mockUsers });

    const results = instance._onFilterChanged('Charlie', []);
    expect(results.length).toBe(0);
  });
});