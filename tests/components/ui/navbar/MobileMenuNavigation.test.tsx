import { render, screen, fireEvent } from '@testing-library/react'
import MobileMenuNavigation from '../../../../components/ui/navbar/MobileMenuNavigation'

const mockItems = [
  {
    name: 'Home',
    href: '/home',
  },
  {
    name: 'Products',
    links: [
      { title: 'Product A', href: '/products/a', description: 'First product' },
      { title: 'Product B', href: '/products/b', description: 'Second product' },
    ],
  },
]

describe('MobileMenuNavigation', () => {
  it('renders navigation title', () => {
    render(<MobileMenuNavigation items={mockItems} onItemClick={jest.fn()} />)
    expect(screen.getByText('Navigation')).toBeInTheDocument()
  })

  it('renders all navigation items', () => {
    render(<MobileMenuNavigation items={mockItems} onItemClick={jest.fn()} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('renders nested links correctly', () => {
    render(<MobileMenuNavigation items={mockItems} onItemClick={jest.fn()} />)
    expect(screen.getByText('Product A')).toBeInTheDocument()
    expect(screen.getByText('Product B')).toBeInTheDocument()
    expect(screen.getByText('First product')).toBeInTheDocument()
    expect(screen.getByText('Second product')).toBeInTheDocument()
  })

  it('calls onItemClick when direct link is clicked', () => {
    const mockClick = jest.fn()
    render(<MobileMenuNavigation items={mockItems} onItemClick={mockClick} />)
    
    fireEvent.click(screen.getByText('Home'))
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  it('calls onItemClick when nested link is clicked', () => {
    const mockClick = jest.fn()
    render(<MobileMenuNavigation items={mockItems} onItemClick={mockClick} />)
    
    fireEvent.click(screen.getByText('Product A'))
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  it('renders empty state gracefully', () => {
    render(<MobileMenuNavigation items={[]} onItemClick={jest.fn()} />)
    expect(screen.getByText('Navigation')).toBeInTheDocument()
  })
})
