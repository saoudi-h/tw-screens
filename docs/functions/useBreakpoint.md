[**tw-screens**](../README.md)

***

[tw-screens](../README.md) / useBreakpoint

# Function: useBreakpoint()

> **useBreakpoint**(`breakpoint`, `options`?): `boolean`

React hook that checks if the current window size matches a specified breakpoint.

## Parameters

### breakpoint

[`ScreenValue`](../type-aliases/ScreenValue.md)

The breakpoint to match, which can be a string or an object defining screen size.

### options?

[`UseBreakpointOptions`](../interfaces/UseBreakpointOptions.md)

Optional settings to reverse the matching logic.

## Returns

`boolean`

`true` if the breakpoint is matched, `false` otherwise. Reverses the value if `reverse` is enabled.

## Example

```typescript
const isMediumScreen = useBreakpoint("768px");
const isSmallScreen = useBreakpoint({ max: "480px" });
const isMobile = useBreakpoint("680px", { reverse: true });
const isXS = useBreakpointReverse("480px");
const isLandscape = useBreakpointReverse({ raw: "(orientation: landscape)" });
```

## Defined in

[hooks/useBreakpoint.ts:32](https://github.com/saoudi-h/tw-screens/blob/71d2425cc2e58b55501e1e18610c4fc42dac0eb6/src/hooks/useBreakpoint.ts#L32)
