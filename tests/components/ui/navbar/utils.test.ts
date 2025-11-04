import { 
  determineLayout, 
  getStaggerDelay, 
  generateLinkKey,
  getContainerClass 
} from '../../../../components/ui/navbar/utils'

describe('Navbar Utils', () => {
  describe('determineLayout', () => {
    it('returns grid for 4 or fewer links', () => {
      const links = [
        { title: 'Link 1', href: '/1' },
        { title: 'Link 2', href: '/2' },
        { title: 'Link 3', href: '/3' },
        { title: 'Link 4', href: '/4' },
      ]
      expect(determineLayout(links, 'auto')).toBe('grid')
    })

    it('returns list for more than 4 links', () => {
      const links = [
        { title: 'Link 1', href: '/1' },
        { title: 'Link 2', href: '/2' },
        { title: 'Link 3', href: '/3' },
        { title: 'Link 4', href: '/4' },
        { title: 'Link 5', href: '/5' },
      ]
      expect(determineLayout(links, 'auto')).toBe('list')
    })

    it('respects explicit layout parameter', () => {
      const links = [{ title: 'Link 1', href: '/1' }]
      expect(determineLayout(links, 'list')).toBe('list')
      expect(determineLayout(links, 'grid')).toBe('grid')
    })

    it('handles undefined links array', () => {
      expect(determineLayout(undefined, 'auto')).toBe('grid')
    })

    it('handles empty links array', () => {
      expect(determineLayout([], 'auto')).toBe('grid')
    })
  })

  describe('getStaggerDelay', () => {
    it('calculates delay correctly with defaults', () => {
      expect(getStaggerDelay(0)).toBe(0.15)
      expect(getStaggerDelay(1)).toBe(0.20)
      expect(getStaggerDelay(2)).toBe(0.25)
      expect(getStaggerDelay(3)).toBe(0.30)
    })

    it('uses custom base delay', () => {
      expect(getStaggerDelay(0, 0.3)).toBe(0.3)
      expect(getStaggerDelay(1, 0.3)).toBe(0.35)
    })

    it('uses custom increment', () => {
      expect(getStaggerDelay(0, 0.15, 0.1)).toBe(0.15)
      expect(getStaggerDelay(1, 0.15, 0.1)).toBe(0.25)
      expect(getStaggerDelay(2, 0.15, 0.1)).toBe(0.35)
    })

    it('handles zero index', () => {
      expect(getStaggerDelay(0, 0, 0)).toBe(0)
    })

    it('returns type number', () => {
      expect(typeof getStaggerDelay(1)).toBe('number')
    })
  })

  describe('generateLinkKey', () => {
    it('generates unique key from href and index', () => {
      expect(generateLinkKey('/test', 0)).toBe('/test-0')
      expect(generateLinkKey('/test', 1)).toBe('/test-1')
      expect(generateLinkKey('/about', 5)).toBe('/about-5')
    })

    it('handles special characters in href', () => {
      expect(generateLinkKey('/test?query=1', 0)).toBe('/test?query=1-0')
      expect(generateLinkKey('/test#hash', 1)).toBe('/test#hash-1')
    })

    it('handles empty href', () => {
      expect(generateLinkKey('', 0)).toBe('-0')
    })

    it('returns string type', () => {
      expect(typeof generateLinkKey('/test', 0)).toBe('string')
    })
  })

  describe('getContainerClass', () => {
    it('returns flex classes for list layout', () => {
      const result = getContainerClass('list', 2)
      expect(result).toContain('flex')
      expect(result).toContain('flex-col')
      expect(result).toContain('w-full')
      expect(result).toContain('list-none')
      expect(result).toContain('gap-0')
    })

    it('returns grid classes for grid layout with 2 columns', () => {
      const result = getContainerClass('grid', 2)
      expect(result).toContain('grid')
      expect(result).toContain('w-full')
      expect(result).toContain('list-none')
      expect(result).toContain('grid-cols-1')
      expect(result).toContain('gap-0')
      expect(result).toContain('sm:grid-cols-[12rem_12rem]')
    })

    it('returns grid classes for grid layout with 3 columns', () => {
      const result = getContainerClass('grid', 3)
      expect(result).toContain('sm:grid-cols-[12rem_12rem_12rem]')
    })

    it('does not include grid classes for list layout', () => {
      const result = getContainerClass('list', 2)
      expect(result).not.toContain('grid')
      expect(result).not.toContain('grid-cols')
    })

    it('returns string type', () => {
      expect(typeof getContainerClass('list', 2)).toBe('string')
      expect(typeof getContainerClass('grid', 3)).toBe('string')
    })
  })
})