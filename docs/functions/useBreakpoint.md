[**tw-screens**](../README.md) • **Docs**

***

[tw-screens](../README.md) / useBreakpoint

# Function: useBreakpoint()

> **useBreakpoint**(`breakpoint`, `options`?): `boolean`

React hook that checks if the current window size matches a specified breakpoint.

## Parameters

• **breakpoint**: [`ScreenValue`](../type-aliases/ScreenValue.md)

The breakpoint to match, which can be a string or an object defining screen size.

• **options?**: [`UseBreakpointOptions`](../interfaces/UseBreakpointOptions.md)

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

[hooks/useBreakpoint.ts:32](https://github.com/saoudi-h/tw-screens/blob/88fd7cb306de641c909967670d6d413d954f23c9/src/hooks/useBreakpoint.ts#L32)
