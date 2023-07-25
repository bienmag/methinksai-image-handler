import React from 'react';
import { render, screen } from '@testing-library/react';
import List from '../src/List';
import { MemoryRouter } from 'react-router-dom';

describe('List', () => {
  const images = [
    { id: 1, common_name: 'Plant 1' },
    { id: 2, common_name: 'Plant 2' },
  ];

  it('should display  "Loading..." message when no images', () => {
    render(<List images={[]} />);
    const loadingDiv = screen.getByText('Loading...');
    expect(loadingDiv).toBeInTheDocument();
  });
  it('should display the list of items and the total count', () => {
    render(
      <MemoryRouter>
        <List images={images} />
      </MemoryRouter>
    );
    const listItems = screen.getAllByRole('link');
    const totalCount = screen.getByText('2 files');

    expect(listItems).toHaveLength(2);
    expect(totalCount).toBeInTheDocument();
  });

  it('should render the correct image data for each list item', () => {
    render(
      <MemoryRouter>
        <List images={images} />
      </MemoryRouter>
    );

    const nameItem1 = screen.getByText('Plant 1');
    const idItem1 = screen.getByText('id: 1');
    const nameItem2 = screen.getByText('Plant 2');
    const idItem2 = screen.getByText('id: 2');

    expect(nameItem1).toBeInTheDocument();
    expect(idItem1).toBeInTheDocument();
    expect(nameItem2).toBeInTheDocument();
    expect(idItem2).toBeInTheDocument();
  });

  it('should have the correct "href" attributes in the links', () => {
    render(
      <MemoryRouter>
        <List images={images} />
      </MemoryRouter>
    );
    const linkElements = screen.getAllByRole('link');

    expect(linkElements[0]).toHaveAttribute('href', '/image/1');
    expect(linkElements[1]).toHaveAttribute('href', '/image/2');
  });
});
