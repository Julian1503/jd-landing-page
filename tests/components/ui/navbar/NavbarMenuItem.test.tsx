import { render, screen } from '@testing-library/react'
import NavbarMenuItem from '../../../../components/ui/navbar/NavbarMenuItem'

jest.mock('@base-ui-components/react/navigation-menu', () => ({
  NavigationMenu: {
    Item: ({ children }: any) => <div>{children}</div>,
    Trigger: ({ children }: any) => <button>{children}</button>,
    Icon: ({ children }: any) => <span>{children}</span>,
    Content: ({ children }: any) => <div>{children}</div>,
  },
}))

describe('NavbarMenuItem', () => {
  it('renders simple link without dropdown', () => {
    render(<NavbarMenuItem name="Home" href="/" />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders dropdown when links are provided', () => {
    const links = [
      { title: 'Link 1', href: '/1' },
      { title: 'Link 2', href: '/2' },
    ]
    render(<NavbarMenuItem name="Products" links={links} />)
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('uses grid layout for 4 or fewer links', () => {
    const links = [
      { title: 'Link 1', href: '/1' },
      { title: 'Link 2', href: '/2' },
    ]
    const { container } = render(
      <NavbarMenuItem name="Products" links={links} layout="auto" />
    )
    const list = container.querySelector('ul')
    expect(list?.className).toContain('grid')
  })

  it('uses list layout for more than 4 links', () => {
    const links = Array.from({ length: 6 }, (_, i) => ({
      title: `Link ${i + 1}`,
      href: `/${i + 1}`,
    }))
    const { container } = render(
      <NavbarMenuItem name="Products" links={links} layout="auto" />
    )
    const list = container.querySelector('ul')
    expect(list?.className).toContain('flex-col')
  })

  it('respects explicit layout prop', () => {
    const links = [
      { title: 'Link 1', href: '/1' },
      { title: 'Link 2', href: '/2' },
    ]
    const { container } = render(
      <NavbarMenuItem name="Products" links={links} layout="list" />
    )
    const list = container.querySelector('ul')
    expect(list?.className).toContain('flex-col')
  })
})