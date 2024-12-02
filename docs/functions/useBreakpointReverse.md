[**tw-screens**](../README.md)

***

[tw-screens](../README.md) / useBreakpointReverse

# Function: useBreakpointReverse()

> **useBreakpointReverse**(`breakpoint`): `boolean`

`useBreakpointReverse` is a React hook that checks if the current window size
does *not* match a specified breakpoint. Internally, it uses the `useBreakpoint`
hook with the `reverse` option enabled.

## Parameters

### breakpoint

[`ScreenValue`](../type-aliases/ScreenValue.md)

The breakpoint to match, provided as a screen size value.

## Returns

`boolean`

`true` if the breakpoint is not matched, `false` otherwise.

## Example

```typescript
const isMobile = useBreakpointReverse("680px");
const isDesktop = useBreakpointReverse({ max: "480px" });
const isMobile = useBreakpointReverse({ min: "480px" });
```

## Defined in

[hooks/useBreakpointReverse.ts:19](https://github.com/saoudi-h/tw-screens/blob/71d2425cc2e58b55501e1e18610c4fc42dac0eb6/src/hooks/useBreakpointReverse.ts#L19)
