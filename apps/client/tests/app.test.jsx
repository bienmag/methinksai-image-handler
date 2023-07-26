import App from '../src/App';
import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import API from '../src/utils/api';
import { vitest } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

vitest.mock('../src/utils/api', async () => {
  const actual = await vitest.importActual('../src/utils/api');
  return {
    ...actual,
    getImages: vitest.fn().mockResolvedValue({}),
  };
});

describe('App', () => {
  it('should toggle between light and dark mode', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const moonIcon = screen.getByTitle('moon icon');

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    act(() => {
      userEvent.click(moonIcon);
    });

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    const sunIcon = screen.getByTitle('sun icon');

    act(() => {
      userEvent.click(sunIcon);
    });

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });

  it('should call API.getImages once', async () => {
    const getImagesSpy = vitest.spyOn(API, 'getImages');

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getImagesSpy).toHaveBeenCalledTimes(1);
  });

  it('should set the images state when fetched from API', async () => {
    const mockImages = [
      { id: 1, common_name: 'Plant 1' },
      { id: 2, common_name: 'Plant 2' },
    ];

    API.getImages.mockResolvedValue(mockImages);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(API.getImages).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Plant 1')).toBeInTheDocument();
      expect(screen.getByText('Plant 2')).toBeInTheDocument();
    });
  });
});
