import type {
  BaseLink,
  NestedLink,
  NavbarMenuItemProps,
  MobileMenuButtonProps,
} from '@/components/ui/navbar/types'

describe('Navbar Types', () => {
  describe('BaseLink', () => {
    it('accepts valid base link', () => {
      const link: BaseLink = {
        title: 'Test',
        href: '/test',
      }
      expect(link).toBeDefined()
    })

    it('accepts optional description', () => {
      const link: BaseLink = {
        title: 'Test',
        href: '/test',
        description: 'Test description',
      }
      expect(link.description).toBe('Test description')
    })

    it('accepts optional icon', () => {
      const link: BaseLink = {
        title: 'Test',
        href: '/test',
        icon: <div>Icon</div>,
      }
      expect(link.icon).toBeDefined()
    })
  })

  describe('NestedLink', () => {
    it('accepts children array', () => {
      const link: NestedLink = {
        title: 'Parent',
        href: '/parent',
        children: [
          { title: 'Child', href: '/child' },
        ],
      }
      expect(link.children).toHaveLength(1)
    })

    it('supports recursive nesting', () => {
      const link: NestedLink = {
        title: 'L1',
        href: '/l1',
        children: [
          {
            title: 'L2',
            href: '/l2',
            children: [
              { title: 'L3', href: '/l3' },
            ],
          },
        ],
      }
      expect(link.children?.[0].children).toHaveLength(1)
    })
  })

  describe('NavbarMenuItemProps', () => {
    it('requires name property', () => {
      const item: NavbarMenuItemProps = {
        name: 'Test',
      }
      expect(item.name).toBe('Test')
    })

    it('accepts optional href for direct links', () => {
      const item: NavbarMenuItemProps = {
        name: 'Test',
        href: '/test',
      }
      expect(item.href).toBe('/test')
    })

    it('accepts optional links for dropdowns', () => {
      const item: NavbarMenuItemProps = {
        name: 'Test',
        links: [
          { title: 'Link', href: '/link' },
        ],
      }
      expect(item.links).toHaveLength(1)
    })

    it('accepts layout options', () => {
      const gridItem: NavbarMenuItemProps = {
        name: 'Test',
        layout: 'grid',
        gridCols: 3,
      }
      expect(gridItem.layout).toBe('grid')
      expect(gridItem.gridCols).toBe(3)
    })
  })

  describe('MobileMenuButtonProps', () => {
    it('requires isOpen and onToggle', () => {
      const props: MobileMenuButtonProps = {
        isOpen: false,
        onToggle: () => {},
      }
      expect(props.isOpen).toBe(false)
      expect(typeof props.onToggle).toBe('function')
    })
  })
})