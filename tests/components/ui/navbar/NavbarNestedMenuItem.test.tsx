import { render, screen } from '@testing-library/react'
import NavbarNestedMenuItem from '../../../../components/ui/navbar/NavbarNestedMenuItem'

jest.mock('@base-ui-components/react/navigation-menu', () => ({
  NavigationMenu: {
    Root: ({ children }: any) => <div>{children}</div>,
    Item: ({ children }: any) => <div>{children}</div>,
    Trigger: ({ children }: any) => <button>{children}</button>,
    Icon: ({ children }: any) => <span>{children}</span>,
    Content: ({ children }: any) => <div>{children}</div>,
    Portal: ({ children }: any) => <div>{children}</div>,
    Positioner: ({ children }: any) => <div>{children}</div>,
    Popup: ({ children }: any) => <div>{children}</div>,
    Arrow: ({ children }: any) => <div>{children}</div>,
    Viewport: ({ children }: any) => <div>{children}</div>,
  },
}))

describe('NavbarNestedMenuItem', () => {
  it('renders simple link without children', () => {
    const link = {
      title: 'Simple Link',
      href: '/simple',
      description: 'A simple link',
    }
    render(<NavbarNestedMenuItem link={link} />)
    expect(screen.getByText('Simple Link')).toBeInTheDocument()
    expect(screen.getByText('A simple link')).toBeInTheDocument()
  })

  it('renders nested menu when children exist', () => {
    const link = {
      title: 'Parent',
      href: '/parent',
      children: [
        { title: 'Child 1', href: '/child1' },
        { title: 'Child 2', href: '/child2' },
      ],
    }
    render(<NavbarNestedMenuItem link={link} />)
    expect(screen.getByText('Parent')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    const link = {
      title: 'Link',
      href: '/link',
      description: 'Link description',
    }
    render(<NavbarNestedMenuItem link={link} />)
    expect(screen.getByText('Link description')).toBeInTheDocument()
  })

  it('renders icon when provided', () => {
    const TestIcon = () => <svg data-testid="nav-icon" />
    const link = {
      title: 'Link',
      href: '/link',
      icon: <TestIcon />,
    }
    render(<NavbarNestedMenuItem link={link} />)
    expect(screen.getByTestId('nav-icon')).toBeInTheDocument()
  })

  it('renders nested children recursively', () => {
    const link = {
      title: 'Level 1',
      href: '/l1',
      children: [
        {
          title: 'Level 2',
          href: '/l2',
          children: [
            { title: 'Level 3', href: '/l3' },
          ],
        },
      ],
    }
    render(<NavbarNestedMenuItem link={link} />)
    expect(screen.getByText('Level 1')).toBeInTheDocument()
  })
})
