[**tw-screens**](../README.md)

***

[tw-screens](../README.md) / ScreensConfig

# Type Alias: ScreensConfig

> **ScreensConfig**: `string`[] \| readonly `string`[] \| [`KeyValuePair`](KeyValuePair.md)\<`string`, `string` \| [`Screen`](Screen.md) \| [`Screen`](Screen.md)[]\>

Configures a set of screens for responsive breakpoints.
- Can be an array or readonly array of screen strings.
- Can also use key-value pairs where keys are labels (e.g., `sm`, `md`) and values
  specify either a string, `Screen` object, or nested array of screens.

## Defined in

[utils/types.ts:33](https://github.com/saoudi-h/tw-screens/blob/71d2425cc2e58b55501e1e18610c4fc42dac0eb6/src/utils/types.ts#L33)
