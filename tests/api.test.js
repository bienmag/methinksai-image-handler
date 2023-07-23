import { describe, it, assert, vitest } from 'vitest';
import API from '../src/utils/api';

const API_KEY = import.meta.env.VITE_API_KEY;

const fetchMock = vitest.fn();
global.fetch = fetchMock;

describe('API', () => {
  beforeEach(() => {
    fetchMock.mockClear();
    vitest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('should fetch images successfully', async () => {
    const mockData = {
      data: [],
    };
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const images = await API.getImages();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `https://perenual.com/api/species-list?page=1&key=${API_KEY}`
    );

    expect(images).toEqual(mockData.data);
  });

  it('should handle fetch failure', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const images = await API.getImages();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `https://perenual.com/api/species-list?page=1&key=${API_KEY}`
    );

    expect(images).toEqual([]);
  });

  it('should handle fetch error and log to console', async () => {
    const errorMessage = 'Network error';

    fetchMock.mockRejectedValueOnce(new Error(errorMessage));

    const images = await API.getImages();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `https://perenual.com/api/species-list?page=1&key=${API_KEY}`
    );

    expect(images).toEqual([]);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(console.error.mock.calls[0][0].message).toBe(errorMessage);
  });
});
