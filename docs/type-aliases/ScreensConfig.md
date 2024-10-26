[**tw-screens**](../README.md) • **Docs**

***

[tw-screens](../globals.md) / ScreensConfig

# Type Alias: ScreensConfig

> **ScreensConfig**: `string`[] \| readonly `string`[] \| `KeyValuePair`\<`string`, `string` \| [`Screen`](Screen.md) \| [`Screen`](Screen.md)[]\>

Configures a set of screens for responsive breakpoints.
- Can be an array or readonly array of screen strings.
- Can also use key-value pairs where keys are labels (e.g., `sm`, `md`) and values
  specify either a string, `Screen` object, or nested array of screens.

## Defined in

[utils/types.ts:29](https://github.com/saoudi-h/tw-screens/blob/a1ea34fff45e5eeab9ecdc2f92def89c098aafa0/src/utils/types.ts#L29)
