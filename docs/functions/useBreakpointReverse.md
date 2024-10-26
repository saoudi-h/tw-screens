[**tw-screens**](../README.md) • **Docs**

***

[tw-screens](../globals.md) / useBreakpointReverse

# Function: useBreakpointReverse()

> **useBreakpointReverse**(`breakpoint`): `boolean`

`useBreakpointReverse` is a React hook that checks if the current window size
does *not* match a specified breakpoint. Internally, it uses the `useBreakpoint`
hook with the `reverse` option enabled.

## Parameters

• **breakpoint**: [`ScreenValue`](../type-aliases/ScreenValue.md)

The breakpoint to match, provided as a screen size value.

## Returns

`boolean`

`true` if the breakpoint is not matched, `false` otherwise.

## Example

```typescript
const isNotMediumScreen = useBreakpointReverse("768px");
const isNotSmallScreen = useBreakpointReverse({ max: "480px" });
```

## Defined in

[hooks/useBreakpointReverse.ts:19](https://github.com/saoudi-h/tw-screens/blob/a1ea34fff45e5eeab9ecdc2f92def89c098aafa0/src/hooks/useBreakpointReverse.ts#L19)
