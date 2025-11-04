import { render, screen, fireEvent } from '@testing-library/react'
import MobileMenuOverlay from '../../../../components/ui/navbar/MobileMenuOverlay'

jest.mock('@/hooks/useHeaderHeight', () => ({
  useHeaderHeight: () => 80,
}))

describe('MobileMenuOverlay', () => {
  it('renders with correct positioning', () => {
    const { container } = render(<MobileMenuOverlay onClose={jest.fn()} />)
    const overlay = container.firstChild as HTMLElement
    expect(overlay.style.top).toBe('80px')
  })

  it('calls onClose when clicked', () => {
    const mockClose = jest.fn()
    const { container } = render(<MobileMenuOverlay onClose={mockClose} />)
    
    fireEvent.click(container.firstChild as HTMLElement)
    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('has correct aria-hidden attribute', () => {
    const { container } = render(<MobileMenuOverlay onClose={jest.fn()} />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies backdrop blur styles', () => {
    const { container } = render(<MobileMenuOverlay onClose={jest.fn()} />)
    expect(container.firstChild).toHaveClass('backdrop-blur-sm')
  })

  it('has correct z-index', () => {
    const { container } = render(<MobileMenuOverlay onClose={jest.fn()} />)
    expect(container.firstChild).toHaveClass('z-40')
  })
})
