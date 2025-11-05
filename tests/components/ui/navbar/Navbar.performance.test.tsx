import { data, NavbarDesktop, NavbarMobile } from "@/components/layout/navbar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockItems = data;

describe('Navbar Performance', () => {
  it('renders large menu in under 100ms', () => {
    const largeItems = Array.from({ length: 100 }, (_, i) => ({
      name: `Item ${i}`,
      href: `/${i}`
    }));

    const start = performance.now();
    render(<NavbarDesktop items={largeItems} />);
    const end = performance.now();

    expect(end - start).toBeLessThan(100);
  });

  it('lazy loads mobile components only when opened', async () => {
    const { container } = render(<NavbarMobile items={mockItems} />);
    
    // Verificar que componentes no están cargados
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
    
    // Abrir menú
    fireEvent.click(screen.getByRole('button'));
    
    // Ahora sí deben estar cargados
    await waitFor(() => {
      expect(container.querySelector('[role="dialog"]')).toBeInTheDocument();
    });
  });
});