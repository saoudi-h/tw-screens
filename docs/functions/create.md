[**tw-screens**](../README.md) • **Docs**

***

[tw-screens](../README.md) / create

# Function: create()

> **create**\<`Screens`\>(`screens`): [`CreateResult`](../interfaces/CreateResult.md)\<`Screens`\>

Generates a set of hooks for managing screen breakpoints.

## Type Parameters

• **Screens** *extends* [`ScreensConfig`](../type-aliases/ScreensConfig.md) = `object`

The configuration of breakpoints to manage.

## Parameters

• **screens**: `Screens` = `...`

Optional configuration object or array of breakpoints.
Defaults to `defaultScreens`.

## Returns

[`CreateResult`](../interfaces/CreateResult.md)\<`Screens`\>

A collection of hooks for using, observing, and managing screen breakpoints.

## Defined in

[managers/create.ts:91](https://github.com/saoudi-h/tw-screens/blob/88fd7cb306de641c909967670d6d413d954f23c9/src/managers/create.ts#L91)
