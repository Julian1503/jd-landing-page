import { render, screen } from '@testing-library/react'
import MobileMenuUserHeader from '../../../../components/ui/navbar/NavbarMobile/MobileMenuUserHeader'

jest.mock('@clerk/nextjs', () => ({
  useUser: () => ({
    user: {
      fullName: 'John Doe',
      imageUrl: '/test-avatar.jpg',
      primaryEmailAddress: {
        emailAddress: 'john@example.com',
      },
    },
  }),
}))

describe('MobileMenuUserHeader', () => {
  it('renders user full name', () => {
    render(<MobileMenuUserHeader />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders user email', () => {
    render(<MobileMenuUserHeader />)
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('renders user avatar image', () => {
    render(<MobileMenuUserHeader />)
    const img = screen.getByAltText('User avatar')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test-avatar.jpg')
  })

  it('applies gradient background styles', () => {
    const { container } = render(<MobileMenuUserHeader />)
    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('bg-linear-to-br')
  })
})