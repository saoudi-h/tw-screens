[**tw-screens**](../README.md) • **Docs**

***

[tw-screens](../README.md) / useBreakpointReverse

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
const isMobile = useBreakpointReverse("680px");
const isDesktop = useBreakpointReverse({ max: "480px" });
const isMobile = useBreakpointReverse({ min: "480px" });
```

## Defined in

[hooks/useBreakpointReverse.ts:19](https://github.com/saoudi-h/tw-screens/blob/88fd7cb306de641c909967670d6d413d954f23c9/src/hooks/useBreakpointReverse.ts#L19)
