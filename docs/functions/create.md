[**tw-screens**](../README.md) • **Docs**

***

[tw-screens](../globals.md) / create

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

[managers/create.ts:90](https://github.com/saoudi-h/tw-screens/blob/a1ea34fff45e5eeab9ecdc2f92def89c098aafa0/src/managers/create.ts#L90)
