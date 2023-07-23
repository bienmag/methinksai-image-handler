import { fireEvent, render, screen } from '@testing-library/react';
import { WritingComments } from '../src/ImagePage/CommentsStates';
import { vitest } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('WritingComments', () => {
  const mockComments = ['Comment 1', 'Comment 2'];

  it('should render the input and button', () => {
    render(<WritingComments comments={mockComments} />);

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', { name: 'Send' });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should handle input change', () => {
    render(<WritingComments comments={mockComments} />);

    const inputElement = screen.getByRole('textbox');

    const newComment = 'Comment 3';
    fireEvent.change(inputElement, { target: { value: newComment } });
    expect(inputElement.value).toBe(newComment);
  });

  it('should handle submit button click', async () => {
    const handleSubmitComment = vitest.fn();

    render(<WritingComments comments={mockComments} handleSubmitComment={handleSubmitComment} />);

    const buttonElement = screen.getByRole('button', { name: 'Send' });
    await userEvent.click(buttonElement);
    expect(handleSubmitComment).toHaveBeenCalledTimes(1);
  });

  it('should display comments list if there are comments', () => {
    render(<WritingComments comments={mockComments} />);
    const commentsListElement = screen.getByTestId('comments-list');

    expect(commentsListElement).toBeInTheDocument();
  });

  it('should display the correct number of comments', () => {
    render(<WritingComments comments={mockComments} />);
    const commentsCountElement = screen.getByText(/2 comments/);

    expect(commentsCountElement).toBeInTheDocument();
  });

  it('should call handleX function when the "x" button is clicked', async () => {
    const handleX = vitest.fn();
    render(<WritingComments comments={mockComments} handleX={handleX} />);
    const xButtonElement = screen.getByRole('button', { name: 'x' });

    await userEvent.click(xButtonElement);
    expect(handleX).toHaveBeenCalledTimes(1);
  });
});
