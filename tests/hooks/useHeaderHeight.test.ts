import { renderHook, waitFor } from '@testing-library/react'
import { useHeaderHeight } from '../../hooks/useHeaderHeight'

describe('useHeaderHeight', () => {
  beforeEach(() => {
    // Create a mock header element
    const header = document.createElement('header')
    header.getBoundingClientRect = jest.fn(() => ({
      height: 80,
      width: 1024,
      top: 0,
      left: 0,
      bottom: 80,
      right: 1024,
      x: 0,
      y: 0,
      toJSON: () => {},
    }))
    document.body.appendChild(header)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('returns fallback value initially', () => {
    const { result } = renderHook(() => useHeaderHeight())
    expect(result.current).toBe(65)
  })

  it('uses custom fallback value', () => {
    const { result } = renderHook(() => 
      useHeaderHeight({ fallback: 100 })
    )
    expect(result.current).toBe(100)
  })

  it('measures header height after mount', async () => {
    const { result } = renderHook(() => useHeaderHeight())
    
    await waitFor(() => {
      expect(result.current).toBe(80)
    })
  })

  it('uses custom selector', async () => {
    const customHeader = document.createElement('div')
    customHeader.setAttribute('data-header', 'true')
    customHeader.getBoundingClientRect = jest.fn(() => ({
      height: 100,
      width: 1024,
      top: 0,
      left: 0,
      bottom: 100,
      right: 1024,
      x: 0,
      y: 0,
      toJSON: () => {},
    }))
    document.body.appendChild(customHeader)

    const { result } = renderHook(() => 
      useHeaderHeight({ selector: '[data-header="true"]' })
    )
    
    await waitFor(() => {
      expect(result.current).toBe(100)
    })
  })
})