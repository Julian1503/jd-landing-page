import { render } from '@testing-library/react'

/**
 * Custom render function with all providers
 */
export function renderWithProviders(ui: React.ReactElement, options = {}) {
  // Would wrap with ClerkProvider, ThemeProvider, etc.
  return render(ui, options)
}

/**
 * Helper to create mock navigation items
 */
export function createMockNavItems(count: number = 3) {
  return Array.from({ length: count }, (_, i) => ({
    name: `Item ${i + 1}`,
    href: `/item-${i + 1}`,
    showSeparatorAfter: i < count - 1,
  }))
}

/**
 * Helper to create mock nested links
 */
export function createMockNestedLinks(parentCount: number, childCount: number) {
  return Array.from({ length: parentCount }, (_, i) => ({
    name: `Parent ${i + 1}`,
    links: Array.from({ length: childCount }, (_, j) => ({
      title: `Child ${i + 1}-${j + 1}`,
      href: `/parent-${i + 1}/child-${j + 1}`,
      description: `Description for child ${j + 1}`,
    })),
  }))
}

/**
 * Helper to simulate viewport resize
 */
export function resizeViewport(width: number, height: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  })
  window.dispatchEvent(new Event('resize'))
}

/**
 * Helper to wait for animations to complete
 */
export async function waitForAnimation(duration = 400) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

/**
 * Mock ResizeObserver for tests
 */
export class MockResizeObserver {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
}
