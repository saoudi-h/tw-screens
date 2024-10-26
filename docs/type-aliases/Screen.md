[**tw-screens**](../README.md) • **Docs**

***

[tw-screens](../README.md) / Screen

# Type Alias: Screen

> **Screen**: `object` \| `object` \| `object` \| `object`

Defines the structure of a screen configuration object used in responsive design.

Screens can specify a `raw` CSS media query string, minimum or maximum widths, or
both min and max width values. Example configurations include:
- `{ raw: "(orientation: portrait)" }`
- `{ min: "768px" }`
- `{ max: "1024px" }`
- `{ min: "768px", max: "1024px" }`

## Defined in

[utils/types.ts:18](https://github.com/saoudi-h/tw-screens/blob/88fd7cb306de641c909967670d6d413d954f23c9/src/utils/types.ts#L18)
