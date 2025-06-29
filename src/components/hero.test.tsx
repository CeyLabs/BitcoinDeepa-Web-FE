import { render, screen } from '@testing-library/react';
import Hero from './hero';

describe('Hero component', () => {
  it('applies responsive class', () => {
    render(<Hero />);
    const section = screen.getByRole('region', { name: 'Hero Section' });
    expect(section).toHaveClass('min-h-hero');
  });
});
