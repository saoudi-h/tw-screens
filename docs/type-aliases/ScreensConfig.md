[**tw-screens**](../README.md) • **Docs**

***

[tw-screens](../README.md) / ScreensConfig

# Type Alias: ScreensConfig

> **ScreensConfig**: `string`[] \| readonly `string`[] \| [`KeyValuePair`](KeyValuePair.md)\<`string`, `string` \| [`Screen`](Screen.md) \| [`Screen`](Screen.md)[]\>

Configures a set of screens for responsive breakpoints.
- Can be an array or readonly array of screen strings.
- Can also use key-value pairs where keys are labels (e.g., `sm`, `md`) and values
  specify either a string, `Screen` object, or nested array of screens.

## Defined in

[utils/types.ts:30](https://github.com/saoudi-h/tw-screens/blob/88fd7cb306de641c909967670d6d413d954f23c9/src/utils/types.ts#L30)
