[**tw-screens**](../README.md) • **Docs**

***

[tw-screens](../globals.md) / useBreakpoint

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
const isLargeScreenInverted = useBreakpoint("1024px", { reverse: true });
```

## Defined in

[hooks/useBreakpoint.ts:31](https://github.com/saoudi-h/tw-screens/blob/a1ea34fff45e5eeab9ecdc2f92def89c098aafa0/src/hooks/useBreakpoint.ts#L31)
