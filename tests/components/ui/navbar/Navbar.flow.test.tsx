import { render, screen, fireEvent } from '@testing-library/react';
import { NavbarMobile } from '@/components/layout/navbar';

const mockItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
];

describe('Navbar Integration Tests', () => {
  describe('Mobile Menu Flow', () => {
    it('complete mobile menu interaction flow', async () => {
      render(<NavbarMobile items={mockItems} />);
      
      // 1. User sees closed menu button
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      
      // 2. User clicks to open menu
      fireEvent.click(button);
      
      // 3. Menu panel should appear (with lazy loading delay)
      await screen.findByRole('dialog');
      
      // 4. User sees navigation items
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });
});