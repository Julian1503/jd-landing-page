import { render, screen, fireEvent } from '@testing-library/react'
import MobileMenuButton from '../../../../components/ui/navbar/MobileMenuButton'

describe('MobileMenuButton', () => {
  it('renders menu icon when closed', () => {
    render(<MobileMenuButton isOpen={false} onToggle={jest.fn()} />)
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument()
  })

  it('calls onToggle when clicked', () => {
    const mockToggle = jest.fn()
    render(<MobileMenuButton isOpen={false} onToggle={mockToggle} />)
    
    fireEvent.click(screen.getByLabelText('Toggle menu'))
    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  it('has correct aria attributes', () => {
    render(<MobileMenuButton isOpen={false} onToggle={jest.fn()} />)
    
    const button = screen.getByLabelText('Toggle menu')
    expect(button).toHaveAttribute('aria-label', 'Toggle menu')
  })

  it('applies hover styles', () => {
    const { container } = render(
      <MobileMenuButton isOpen={false} onToggle={jest.fn()} />
    )
    const button = container.querySelector('button')
    expect(button).toHaveClass('hover:bg-[var(--muted)]')
  })

  it('does not break with multiple rapid clicks', () => {
    const mockToggle = jest.fn()
    render(<MobileMenuButton isOpen={false} onToggle={mockToggle} />)
    
    const button = screen.getByLabelText('Toggle menu')
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)
    
    expect(mockToggle).toHaveBeenCalledTimes(3)
  })
})