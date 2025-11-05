import { data, NavbarMobile } from "@/components/layout/navbar";
import { NavbarMenuItem } from "@/components/ui/navbar";
import { act, screen, fireEvent, render, waitFor } from "@testing-library/react";

const mockLinks = data;

describe('NavbarMenuItem Edge Cases', () => {
  it('handles empty links array gracefully', () => {
    render(<NavbarMenuItem name="Test" links={[]} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles very long menu item names', () => {
    const longName = 'A'.repeat(100);
    render(<NavbarMenuItem name={longName} href="/" />);
    // Verificar truncado o wrapping
  });

  it('handles rapid menu toggling', async () => {
    render(<NavbarMenuItem name="Test" links={mockLinks.map(x=>x.links)[0]} />);
    const trigger = screen.getByRole('button');
    
    // Clicks rápidos
    for (let i = 0; i < 10; i++) {
      fireEvent.click(trigger);
    }
    
    // No debe crashear
    expect(trigger).toBeInTheDocument();
  });

  it('handles network-delayed lazy loading', async () => {
    // Mock slow network
    jest.useFakeTimers();
    render(<NavbarMobile items={mockLinks} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    jest.useRealTimers();
  });
});