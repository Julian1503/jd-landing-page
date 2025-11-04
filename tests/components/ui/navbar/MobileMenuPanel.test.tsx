import { render, screen } from '@testing-library/react'
import MobileMenuPanel from '../../../../components/ui/navbar/MobileMenuPanel'

jest.mock('@/hooks/useHeaderHeight', () => ({
  useHeaderHeight: () => 80,
}))

const mockItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
]

describe('MobileMenuPanel', () => {
  it('renders with correct positioning', () => {
    const { container } = render(
      <MobileMenuPanel items={mockItems} onClose={jest.fn()} />
    )
    const panel = container.firstChild as HTMLElement
    expect(panel.style.top).toBe('80px')
  })

  it('renders navigation items', () => {
    render(<MobileMenuPanel items={mockItems} onClose={jest.fn()} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('has correct ARIA attributes', () => {
    const { container } = render(
      <MobileMenuPanel items={mockItems} onClose={jest.fn()} />
    )
    const panel = container.firstChild as HTMLElement
    expect(panel).toHaveAttribute('role', 'dialog')
    expect(panel).toHaveAttribute('aria-modal', 'true')
    expect(panel).toHaveAttribute('aria-label', 'Mobile navigation menu')
  })

  it('renders with correct z-index', () => {
    const { container } = render(
      <MobileMenuPanel items={mockItems} onClose={jest.fn()} />
    )
    expect(container.firstChild).toHaveClass('z-50')
  })
})
