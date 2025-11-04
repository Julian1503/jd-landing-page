import {
  NAV_TRIGGER_CLASS,
  NAV_LINK_CARD_CLASS,
  MOBILE_SECTION_TITLE_CLASS,
  NAV_ANIMATION_STYLE,
} from '@/components/ui/navbar/constants'

describe('Navbar Constants', () => {
  describe('NAV_TRIGGER_CLASS', () => {
    it('contains required Tailwind classes', () => {
      expect(NAV_TRIGGER_CLASS).toContain('flex')
      expect(NAV_TRIGGER_CLASS).toContain('items-center')
      expect(NAV_TRIGGER_CLASS).toContain('rounded-md')
      expect(NAV_TRIGGER_CLASS).toContain('hover:bg-[var(--muted)]')
    })

    it('includes focus visible styles', () => {
      expect(NAV_TRIGGER_CLASS).toContain('focus-visible:outline')
    })

    it('includes data-state styles', () => {
      expect(NAV_TRIGGER_CLASS).toContain('data-[popup-open]:bg-[var(--muted)]')
    })
  })

  describe('NAV_LINK_CARD_CLASS', () => {
    it('contains card styles', () => {
      expect(NAV_LINK_CARD_CLASS).toContain('rounded-md')
      expect(NAV_LINK_CARD_CLASS).toContain('no-underline')
      expect(NAV_LINK_CARD_CLASS).toContain('hover:bg-[var(--muted)]')
    })

    it('includes accessibility styles', () => {
      expect(NAV_LINK_CARD_CLASS).toContain('focus-visible:outline')
    })
  })

  describe('MOBILE_SECTION_TITLE_CLASS', () => {
    it('contains mobile title styles', () => {
      expect(MOBILE_SECTION_TITLE_CLASS).toContain('text-xs')
      expect(MOBILE_SECTION_TITLE_CLASS).toContain('font-semibold')
      expect(MOBILE_SECTION_TITLE_CLASS).toContain('uppercase')
      expect(MOBILE_SECTION_TITLE_CLASS).toContain('tracking-wider')
    })
  })

  describe('NAV_ANIMATION_STYLE', () => {
    it('has correct animation duration', () => {
      expect(NAV_ANIMATION_STYLE['--duration']).toBe('0.35s')
    })

    it('has correct easing function', () => {
      expect(NAV_ANIMATION_STYLE['--easing']).toBe('cubic-bezier(0.22, 1, 0.36, 1)')
    })

    it('is immutable (readonly)', () => {
      expect(() => {
        // @ts-expect-error - Testing immutability
        NAV_ANIMATION_STYLE['--duration'] = '1s'
      }).toThrow()
    })
  })
})