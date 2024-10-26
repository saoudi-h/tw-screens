[**tw-screens**](../README.md) • **Docs**

***

[tw-screens](../globals.md) / Screen

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

[utils/types.ts:17](https://github.com/saoudi-h/tw-screens/blob/a1ea34fff45e5eeab9ecdc2f92def89c098aafa0/src/utils/types.ts#L17)
