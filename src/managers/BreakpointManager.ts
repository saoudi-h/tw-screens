import { generateMediaQuery } from '@/utils'
import { ScreensConfig, ScreenValue } from '@/utils/types'

type Callback = (matches: boolean) => void

/**
 * Manages media query breakpoints and their states. Allows multiple instances
 * and provides a singleton for handling unique screen configurations.
 *
 * @template Screens - A configuration object or array defining breakpoints.
 */
export class BreakpointManager<Screens extends ScreensConfig> {
    /** Map of instances for each unique screen configuration */
    // eslint-disable-next-line
    static instances = new Map<string, BreakpointManager<any>>()

    /** Stores the current match state for each breakpoint */
    private readonly breakpointsState: Record<string, boolean> = {}

    /** Holds subscribers for each breakpoint, storing callback functions */
    private readonly subscribers: Record<string, Set<Callback>> = {}

    /** Maintains `MediaQueryList` objects for each breakpoint */
    private readonly mediaQueryLists: Record<string, MediaQueryList> = {}

    /** Holds cleanup functions to remove event listeners for each breakpoint */
    private readonly cleanupListeners: Record<string, () => void> = {}

    /**
     * Creates a new BreakpointManager instance. Initializes breakpoint states and listeners.
     * @param screens - Configuration for breakpoints.
     */
    private constructor(private readonly screens: Screens) {
        this.init()
    }

    /**
     * Retrieves or creates a singleton instance of `BreakpointManager` for the given configuration.
     * @param screens - Configuration for breakpoints.
     * @returns The singleton `BreakpointManager` instance.
     */
    public static getInstance<Screens extends ScreensConfig>(
        screens: Screens
    ): BreakpointManager<Screens> {
        const key = JSON.stringify(screens)
        if (!this.instances.has(key)) {
            this.instances.set(key, new BreakpointManager(screens))
        }
        return this.instances.get(key)!
    }

    /**
     * Retrieves the current state (matched or not) for a specific breakpoint.
     * @param name - The name of the breakpoint.
     * @returns `true` if the breakpoint is currently matched, `false` otherwise.
     * @throws Will throw an error if the breakpoint name is not defined.
     */
    public getBreakpointState(name: string): boolean {
        if (!(name in this.breakpointsState)) {
            throw new Error(`Breakpoint "${name}" is not defined`)
        }
        return this.breakpointsState[name]
    }

    /**
     * Retrieves the state of all breakpoints.
     * @returns An object with breakpoint names as keys and their match state as values.
     */
    public getAllBreakpointStates(): Readonly<Record<string, boolean>> {
        return { ...this.breakpointsState }
    }

    /**
     * Subscribes to changes for a specific breakpoint, triggering the callback when it changes.
     * @param name - The name of the breakpoint.
     * @param callback - Function to call with the match state on changes.
     * @returns A function to unsubscribe from changes.
     * @throws Will throw an error if the breakpoint name is not defined.
     */
    public subscribe(name: string, callback: Callback): () => void {
        const subscribers = this.subscribers[name]
        if (!subscribers) {
            throw new Error(`Breakpoint "${name}" is not defined`)
        }

        subscribers.add(callback)
        callback(this.breakpointsState[name])

        return () => {
            subscribers.delete(callback)
        }
    }

    /**
     * Cleans up all event listeners and clears subscriptions, used primarily when resetting instances.
     */
    public cleanup(): void {
        Object.values(this.cleanupListeners).forEach(cleanup => cleanup())
        Object.values(this.subscribers).forEach(set => set.clear())
    }

    /**
     * Initializes breakpoints based on the configuration, setting up states and event listeners.
     */
    private init(): void {
        const breakpoints = Array.isArray(this.screens) ? this.screens : Object.keys(this.screens)

        breakpoints.forEach(name => {
            const screenValue = Array.isArray(this.screens)
                ? name
                : (this.screens as ScreenValue[])[name]

            this.setupBreakpoint(name, screenValue)
        })
    }

    /**
     * Configures a specific breakpoint, creating a media query and setting up an event listener.
     * @param name - The name of the breakpoint.
     * @param screenValue - The screen configuration value.
     */
    private setupBreakpoint(name: string, screenValue: ScreenValue): void {
        const mediaQuery = generateMediaQuery(screenValue)

        if (typeof window !== 'undefined' && window.matchMedia) {
            const mql = window.matchMedia(mediaQuery)
            this.mediaQueryLists[name] = mql
            this.breakpointsState[name] = mql.matches
            this.subscribers[name] = new Set()

            const listener = (event: MediaQueryListEvent) => {
                this.breakpointsState[name] = event.matches
                this.notifySubscribers(name, event.matches)
            }

            mql.addEventListener('change', listener)
            this.cleanupListeners[name] = () => mql.removeEventListener('change', listener)
        } else {
            this.breakpointsState[name] = false
            this.subscribers[name] = new Set()
            this.cleanupListeners[name] = () => {}
        }
    }

    /**
     * Notifies all subscribers of a breakpoint when its state changes.
     * @param name - The name of the breakpoint.
     * @param matches - The new match state of the breakpoint.
     */
    private notifySubscribers(name: string, matches: boolean): void {
        this.subscribers[name]?.forEach(callback => callback(matches))
    }

    /**
     * Resets all BreakpointManager instances by clearing subscriptions and cleaning up listeners.
     */
    public static reset(): void {
        this.instances.forEach(instance => instance.cleanup())
        this.instances.clear()
    }
}
