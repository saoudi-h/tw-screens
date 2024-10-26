[**tw-screens**](../README.md) • **Docs**

***

[tw-screens](../README.md) / CreateResult

# Interface: CreateResult\<Screens\>

Defines the return type of the `create` function, providing hooks for working
with screen breakpoints.

## Type Parameters

• **Screens** *extends* [`ScreensConfig`](../type-aliases/ScreensConfig.md)

A configuration of breakpoints.

## Properties

### useBreakpointManager()

> **useBreakpointManager**: () => `BreakpointManager`\<`Screens`\>

Provides access to the `BreakpointManager` instance managing the specified breakpoints.

#### Returns

`BreakpointManager`\<`Screens`\>

The singleton instance of `BreakpointManager`.

#### Defined in

[managers/create.ts:79](https://github.com/saoudi-h/tw-screens/blob/88fd7cb306de641c909967670d6d413d954f23c9/src/managers/create.ts#L79)

***

### useScreen()

> **useScreen**: (`breakpointName`, `options`?) => `boolean`

Determines if a specified breakpoint is currently matched.

#### Parameters

• **breakpointName**: `Screens` *extends* readonly `string`[] ? `Screens`\<`Screens`\>\[`number`\] : `Extract`\<keyof `Screens`, `string`\>

The name of the breakpoint to check.

• **options?**: [`UseScreenOptions`](UseScreenOptions.md)

Options to modify the matching behavior.

#### Returns

`boolean`

`true` if the breakpoint is matched; `false` otherwise.

#### Defined in

[managers/create.ts:28](https://github.com/saoudi-h/tw-screens/blob/88fd7cb306de641c909967670d6d413d954f23c9/src/managers/create.ts#L28)

***

### useScreenEffect()

> **useScreenEffect**: (`breakpointName`, `effect`, `deps`?) => `void`

Runs an effect when a specified breakpoint is matched or not.

#### Parameters

• **breakpointName**: `Screens` *extends* readonly `string`[] ? `Screens`\<`Screens`\>\[`number`\] : `Extract`\<keyof `Screens`, `string`\>

The name of the breakpoint to observe.

• **effect**

A function to run when the match status changes.

• **deps?**: [`DependencyList`](../type-aliases/DependencyList.md)

Optional dependencies to control when the effect should re-run.

#### Returns

`void`

#### Defined in

[managers/create.ts:52](https://github.com/saoudi-h/tw-screens/blob/88fd7cb306de641c909967670d6d413d954f23c9/src/managers/create.ts#L52)

***

### useScreenReverse()

> **useScreenReverse**: (`breakpointName`) => `boolean`

Determines if a specified breakpoint is currently not matched.

#### Parameters

• **breakpointName**: `Screens` *extends* readonly `string`[] ? `Screens`\<`Screens`\>\[`number`\] : `Extract`\<keyof `Screens`, `string`\>

The name of the breakpoint to check.

#### Returns

`boolean`

`true` if the breakpoint is not matched; `false` otherwise.

#### Defined in

[managers/create.ts:40](https://github.com/saoudi-h/tw-screens/blob/88fd7cb306de641c909967670d6d413d954f23c9/src/managers/create.ts#L40)

***

### useScreenValue()

> **useScreenValue**: \<`T`, `U`\>(`breakpointName`, `valid`, `invalid`) => `T` \| `U`

Returns a specified value based on whether the breakpoint is matched or not.

#### Type Parameters

• **T**

• **U**

#### Parameters

• **breakpointName**: `Screens` *extends* readonly `string`[] ? `Screens`\<`Screens`\>\[`number`\] : `Extract`\<keyof `Screens`, `string`\>

The name of the breakpoint to check.

• **valid**: `T`

The value returned if the breakpoint is matched.

• **invalid**: `U`

The value returned if the breakpoint is not matched.

#### Returns

`T` \| `U`

Either `valid` or `invalid` based on the match state.

#### Defined in

[managers/create.ts:67](https://github.com/saoudi-h/tw-screens/blob/88fd7cb306de641c909967670d6d413d954f23c9/src/managers/create.ts#L67)
