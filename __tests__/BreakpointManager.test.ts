import { BreakpointManager } from '@/managers'
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest'

describe('BreakpointManager', () => {
    type MediaQueryCallbacks = {
        [query: string]: ((event: MediaQueryListEvent) => void)[]
    }
    let mediaQueryCallbacks: MediaQueryCallbacks = {}

    const createMatchMedia = (initialMatches: boolean) => {
        return (query: string) => {
            if (!mediaQueryCallbacks[query]) {
                mediaQueryCallbacks[query] = []
            }

            return {
                matches: initialMatches,
                media: query,
                addEventListener: vi.fn(
                    (event: string, callback: (e: MediaQueryListEvent) => void) => {
                        if (event === 'change') {
                            mediaQueryCallbacks[query].push(callback)
                        }
                    }
                ),
                removeEventListener: vi.fn(
                    (event: string, callback: (e: MediaQueryListEvent) => void) => {
                        if (event === 'change') {
                            const index = mediaQueryCallbacks[query].indexOf(callback)
                            if (index > -1) {
                                mediaQueryCallbacks[query].splice(index, 1)
                            }
                        }
                    }
                ),
                dispatchEvent: vi.fn(),
                onchange: null,
            }
        }
    }

    const triggerMediaChange = (query: string, matches: boolean) => {
        const event = new Event('change') as MediaQueryListEvent
        Object.defineProperty(event, 'matches', { value: matches })
        mediaQueryCallbacks[query]?.forEach(callback => callback(event))
    }

    beforeEach(() => {
        BreakpointManager.reset()
        mediaQueryCallbacks = {}
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('getInstance', () => {
        it('should return the same instance for identical screen configs', () => {
            const screens = { sm: '640px', md: '768px' }
            const instance1 = BreakpointManager.getInstance(screens)
            const instance2 = BreakpointManager.getInstance(screens)

            expect(instance1).toBe(instance2)
        })

        it('should create different instances for different screen configs', () => {
            const screens1 = { sm: '640px', md: '768px' }
            const screens2 = { sm: '640px', lg: '1024px' }
            const instance1 = BreakpointManager.getInstance(screens1)
            const instance2 = BreakpointManager.getInstance(screens2)

            expect(instance1).not.toBe(instance2)
        })
    })

    describe('getBreakpointState', () => {
        it('should return correct breakpoint state', () => {
            vi.stubGlobal('window', {
                matchMedia: createMatchMedia(true),
            })

            const screens = { sm: '640px', md: '768px' }
            const manager = BreakpointManager.getInstance(screens)

            expect(manager.getBreakpointState('sm')).toBe(true)
            expect(manager.getBreakpointState('md')).toBe(true)
        })

        it('should throw error for undefined breakpoint', () => {
            const screens = { sm: '640px' }
            const manager = BreakpointManager.getInstance(screens)

            expect(() => manager.getBreakpointState('lg')).toThrow('Breakpoint "lg" is not defined')
        })
    })

    describe('subscribe', () => {
        it('should call callback with initial state and on changes', () => {
            const matchMedia = createMatchMedia(false)
            vi.stubGlobal('window', { matchMedia })

            const screens = { sm: '640px' }
            const manager = BreakpointManager.getInstance(screens)
            const callback = vi.fn()

            const unsubscribe = manager.subscribe('sm', callback)
            expect(callback).toHaveBeenCalledWith(false)

            triggerMediaChange('(min-width: 640px)', true)
            expect(callback).toHaveBeenCalledWith(true)

            unsubscribe()
        })

        it('should handle multiple subscribers', () => {
            const matchMedia = createMatchMedia(false)
            vi.stubGlobal('window', { matchMedia })

            const screens = { sm: '640px' }
            const manager = BreakpointManager.getInstance(screens)
            const callback1 = vi.fn()
            const callback2 = vi.fn()

            manager.subscribe('sm', callback1)
            manager.subscribe('sm', callback2)

            triggerMediaChange('(min-width: 640px)', true)

            expect(callback1).toHaveBeenCalledWith(true)
            expect(callback2).toHaveBeenCalledWith(true)
        })

        it('should properly unsubscribe callback', () => {
            const matchMedia = createMatchMedia(false)
            vi.stubGlobal('window', { matchMedia })

            const screens = { sm: '640px' }
            const manager = BreakpointManager.getInstance(screens)
            const callback = vi.fn()

            const unsubscribe = manager.subscribe('sm', callback)
            unsubscribe()

            triggerMediaChange('(min-width: 640px)', true)
            expect(callback).toHaveBeenCalledTimes(1)
        })
    })

    describe('cleanup', () => {
        it('should remove all subscribers and event listeners', () => {
            const matchMedia = createMatchMedia(false)
            vi.stubGlobal('window', { matchMedia })

            const screens = { sm: '640px' }
            const manager = BreakpointManager.getInstance(screens)
            const callback = vi.fn()

            manager.subscribe('sm', callback)
            manager.cleanup()

            triggerMediaChange('(min-width: 640px)', true)
            expect(callback).toHaveBeenCalledTimes(1)
        })
    })

    describe('SSR compatibility', () => {
        it('should handle server-side rendering environment', () => {
            vi.stubGlobal('window', undefined)

            const screens = { sm: '640px' }
            const manager = BreakpointManager.getInstance(screens)

            expect(manager.getBreakpointState('sm')).toBe(false)
        })
    })

    describe('Array screen config', () => {
        it('should handle array-based screen configuration', () => {
            vi.stubGlobal('window', {
                matchMedia: createMatchMedia(true),
            })

            const screens = ['640px', '768px']
            const manager = BreakpointManager.getInstance(screens)

            expect(manager.getBreakpointState('640px')).toBe(true)
            expect(manager.getBreakpointState('768px')).toBe(true)
        })
    })

    describe('Complex screen config', () => {
        it('should handle object-based screen configurations', () => {
            vi.stubGlobal('window', {
                matchMedia: createMatchMedia(true),
            })

            const screens = {
                sm: { min: '640px', max: '767px' },
                md: { raw: '(min-width: 768px) and (max-width: 1023px)' },
            }
            const manager = BreakpointManager.getInstance(screens)

            expect(manager.getBreakpointState('sm')).toBe(true)
            expect(manager.getBreakpointState('md')).toBe(true)
        })
    })
})
