[**tw-screens**](../README.md)

***

[tw-screens](../README.md) / Screen

# Type Alias: Screen

> **Screen**: \{`raw`: `string`; \} \| \{`min`: `string`; \} \| \{`max`: `string`; \} \| \{`max`: `string`;`min`: `string`; \}

Defines the structure of a screen configuration object used in responsive design.

Screens can specify a `raw` CSS media query string, minimum or maximum widths, or
both min and max width values. Example configurations include:
- `{ raw: "(orientation: portrait)" }`
- `{ min: "768px" }`
- `{ max: "1024px" }`
- `{ min: "768px", max: "1024px" }`

## Defined in

[utils/types.ts:21](https://github.com/saoudi-h/tw-screens/blob/71d2425cc2e58b55501e1e18610c4fc42dac0eb6/src/utils/types.ts#L21)
