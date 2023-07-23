import ImagePage from '../src/ImagePage/ImagePage';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('ImagePage', () => {
  const mockImages = [
    {
      id: 1,
      default_image: {
        regural_url: 'example.com/image1.jpg',
      },
      common_name: 'Plant 1',
    },
    {
      id: 2,
      default_image: {
        regural_url: 'example.com/image2.jpg',
      },
      common_name: 'Plant 2',
    },
  ];

  it('should display  "Loading..." message when no image', () => {
    render(<ImagePage images={[]} />);
    const loadingDiv = screen.getByText('Loading...');
    expect(loadingDiv).toBeInTheDocument();
  });

  it('should find the correct image by id when id param matches image id', () => {
    render(
      <MemoryRouter initialEntries={['/image/1']}>
        <Routes>
          <Route path="/image/:id" element={<ImagePage images={mockImages} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Plant 1')).toBeInTheDocument();
    expect(screen.queryByText('Plant 2')).not.toBeInTheDocument();
  });

  it('should render ImageCard when an image is provided and reading mode is not active', () => {
    render(
      <MemoryRouter initialEntries={['/image/1']}>
        <Routes>
          <Route path="/image/:id" element={<ImagePage images={mockImages} />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Plant 1')).toBeInTheDocument();

    expect(screen.queryByTestId('reading-comments')).not.toBeInTheDocument();
    expect(screen.queryByTestId('writing-comments')).not.toBeInTheDocument();
  });

  it('should render ReadingMode when comment button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/image/1']}>
        <Routes>
          <Route path="/image/:id" element={<ImagePage images={mockImages} />} />
        </Routes>
      </MemoryRouter>
    );

    const commentButton = screen.getByTestId('comment-button');
    userEvent.click(commentButton);
    const readingCommentsElement = await waitFor(() => {
      return screen.getByTestId('reading-mode');
    });
    expect(readingCommentsElement).toBeInTheDocument();
  });

  it('should render WritingMode when input in ReadingMode is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/image/1']}>
        <Routes>
          <Route path="/image/:id" element={<ImagePage images={mockImages} />} />
        </Routes>
      </MemoryRouter>
    );

    const commentButton = screen.getByTestId('comment-button');
    userEvent.click(commentButton);

    const readingCommentsElement = await waitFor(() => {
      return screen.getByTestId('reading-mode');
    });
    expect(readingCommentsElement).toBeInTheDocument();

    const input = screen.getByTestId('input');
    userEvent.click(input);

    const writingComemntsElement = await waitFor(() => {
      return screen.getByTestId('writing-mode');
    });
    expect(writingComemntsElement).toBeInTheDocument();
  });
});
