import { render, screen, fireEvent } from '@testing-library/react'
import MobileMenuAccountSection from '../../../../components/ui/navbar/MobileMenuAccountSection'

// Mock Clerk hooks
const mockSignOut = jest.fn()
const mockOpenUserProfile = jest.fn()

jest.mock('@clerk/nextjs', () => ({
  useClerk: () => ({
    signOut: mockSignOut,
    openUserProfile: mockOpenUserProfile,
  }),
  SignedIn: ({ children }: any) => <div data-testid="signed-in">{children}</div>,
  SignedOut: ({ children }: any) => <div data-testid="signed-out">{children}</div>,
  SignInButton: ({ children }: any) => <button>{children}</button>,
}))

describe('MobileMenuAccountSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders account section title when signed in', () => {
    render(<MobileMenuAccountSection onClose={jest.fn()} />)
    expect(screen.getByText('Account')).toBeInTheDocument()
  })

  it('renders manage account button when signed in', () => {
    render(<MobileMenuAccountSection onClose={jest.fn()} />)
    expect(screen.getByText('Manage account')).toBeInTheDocument()
  })

  it('renders sign out button when signed in', () => {
    render(<MobileMenuAccountSection onClose={jest.fn()} />)
    expect(screen.getByText('Sign out')).toBeInTheDocument()
  })

  it('calls openUserProfile and onClose when manage account clicked', () => {
    const mockClose = jest.fn()
    render(<MobileMenuAccountSection onClose={mockClose} />)
    
    fireEvent.click(screen.getByText('Manage account'))
    expect(mockOpenUserProfile).toHaveBeenCalledTimes(1)
    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('calls signOut when sign out button clicked', () => {
    render(<MobileMenuAccountSection onClose={jest.fn()} />)
    
    fireEvent.click(screen.getByText('Sign out'))
    expect(mockSignOut).toHaveBeenCalledTimes(1)
  })

  it('renders sign in button when signed out', () => {
    render(<MobileMenuAccountSection onClose={jest.fn()} />)
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument()
  })
})