[**tw-screens**](../README.md)

***

[tw-screens](../README.md) / create

# Function: create()

> **create**\<`Screens`\>(`screens`): [`CreateResult`](../interfaces/CreateResult.md)\<`Screens`\>

Generates a set of hooks for managing screen breakpoints.

## Type Parameters

• **Screens** *extends* [`ScreensConfig`](../type-aliases/ScreensConfig.md) = \{`2xl`: `"1536px"`;`lg`: `"1024px"`;`md`: `"768px"`;`sm`: `"640px"`;`xl`: `"1280px"`; \}

The configuration of breakpoints to manage.

## Parameters

### screens

`Screens` = `...`

Optional configuration object or array of breakpoints.
Defaults to `defaultScreens`.

## Returns

[`CreateResult`](../interfaces/CreateResult.md)\<`Screens`\>

A collection of hooks for using, observing, and managing screen breakpoints.

## Defined in

[managers/create.ts:91](https://github.com/saoudi-h/tw-screens/blob/71d2425cc2e58b55501e1e18610c4fc42dac0eb6/src/managers/create.ts#L91)
