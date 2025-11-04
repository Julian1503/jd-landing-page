import { render, screen } from '@testing-library/react'
import NavbarLinkContent from '../../../../components/ui/navbar/NavbarLinkContent'
import { Home } from 'lucide-react'

describe('NavbarLinkContent', () => {
  it('renders title correctly', () => {
    render(<NavbarLinkContent title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(
      <NavbarLinkContent 
        title="Test Title" 
        description="Test Description" 
      />
    )
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renders icon when provided', () => {
    const TestIcon = () => <svg data-testid="test-icon" />
    render(
      <NavbarLinkContent 
        title="Test Title" 
        icon={<TestIcon />} 
      />
    )
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    render(<NavbarLinkContent title="Test Title" />)
    expect(screen.queryByText(/Description/)).not.toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<NavbarLinkContent title="Test Title" />)
    expect(container.firstChild).toHaveClass('flex', 'items-start', 'gap-3')
  })

  it('renders title as h3 element', () => {
    render(<NavbarLinkContent title="Test Title" />)
    const title = screen.getByText('Test Title')
    expect(title.tagName).toBe('H3')
  })
})
