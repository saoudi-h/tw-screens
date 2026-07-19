**tw-screens** • [**Docs**](./docs/README.md)

---

# tw-screens

**`tw-screens`** is a lightweight TypeScript library for managing responsive breakpoints dynamically. Inspired by Tailwind CSS, `tw-screens` lets you define custom breakpoints and use hooks to handle UI responsiveness, all while staying compatible with Tailwind's screen configuration.

- **Size**: 4.19 KB (compressed)
- **Type-safe**: Full TypeScript support for optimal DX
- **Coverage**: 90%+ test coverage
- **Compatibility**: Tailwind CSS breakpoint API
- **Performance**: Optimized BreakpointManager for minimal overhead
- **Zero Dependencies**: Minimal footprint

---

## Features

- **Dynamic Breakpoints**: Customizable breakpoints on the fly.
- **Tailwind Compatible**: Same screen API for easy integration.
- **Responsive Hooks**: Includes `useScreen`, `useScreenReverse`, `useScreenValue`, and `useScreenEffect`.
- **Optimized Performance**: Efficient management via BreakpointManager without requiring a provider.
- **Lightweight**: 4.19 KB size keeps your bundle small.
- **SSR Compatible**: Works seamlessly with server-side rendering.

---

## Installation

Install `tw-screens` via npm, yarn or pnpm:

```sh
npm install tw-screens
```

or

```sh
yarn add tw-screens
```

or

```sh
pnpm add tw-screens
```

---

## Getting Started

`tw-screens` is flexible for defining breakpoints and using them in your components.

### Step-by-Step Example: Tailwind CSS Breakpoints

Easily integrate `tw-screens` with your Tailwind CSS configuration.

1. **Define Screens Configuration**

Define screens similar to Tailwind CSS using `min`, `max`, or `raw`.

```typescript
// screens.ts
export const screens = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    custom: { min: '600px', max: '900px' },
    wide: { raw: '(min-width: 1600px)' },
} as const
```

2. **Create Hooks Using `tw-screens`**

Use the `create` function to generate hooks for managing breakpoints.

```typescript
// hooks.ts
import { create } from 'tw-screens'
import { screens } from './screens'

export const { useScreen, useScreenReverse, useScreenValue, useScreenEffect } = create(screens)
```

3. **Integrate with Tailwind CSS**

Add your screens to Tailwind to sync breakpoints.

```typescript
// tailwind.config.js
const { screens } = require('./screens')

module.exports = {
    theme: {
        screens: {
            ...screens,
        },
    },
}
```

4. **Use Hooks in Components**

Use the generated hooks in your components.

```typescript
// ExampleComponent.tsx
import React from "react";
import { useScreen } from "./hooks";

const ExampleComponent = () => {
  const isDesktop = useScreen("md");

  return <div>{isDesktop ? "Desktop View" : "Mobile View"}</div>;
};

export default ExampleComponent;
```

### Raw CSS Breakpoints for Flexibility

Define custom breakpoints directly using CSS media queries.

```typescript
import { useBreakpoint } from 'tw-screens/hooks';

function CustomRawBreakpointComponent() {
  const isWideScreen = useBreakpoint({ raw: "screen and (min-width: 1400px)" });

  return <div>{isWideScreen ? "Wide Screen View" : "Regular View"}</div>;
}
```

### Two Ways to Use `tw-screens`

1. **With Tailwind Screens**: Define breakpoints with Tailwind and sync them:

    ```typescript
    theme: {
      screens: {
        ...screens
      }
    }
    ```

    Default Tailwind configuration users can create hooks without a custom object:

    ```typescript
    import { create } from 'tw-screens'
    export const { useScreen, useScreenReverse, useScreenValue, useScreenEffect } = create()
    ```

2. **Ad-hoc Breakpoints with `useBreakpoint`**: Use for one-off breakpoints:

    ```typescript
    import { useBreakpoint } from 'tw-screens/hooks';

    const ExampleComponent = () => {
      const isMediumScreen = useBreakpoint("850px");
      return <div>{isMediumScreen ? "Medium Screen" : "Other Screen"}</div>;
    };
    ```

---

## API Documentation

- **`create(screens: ScreensConfig)`**
    - Generates hooks like `useScreen`, `useScreenReverse`, and others for custom breakpoints.

- **`useBreakpoint(breakpoint: ScreenValue, options?: UseBreakpointOptions): boolean`**
    - **breakpoint**: A string or object (`{ min: '640px', max: '1024px' }`).

- **`useBreakpointReverse(breakpoint: ScreenValue): boolean`**
    - Provides the opposite of `useBreakpoint`.

For more details, check the [documentation](./docs).

---

## Tailwind v4 & Best Practices

With the release of Tailwind v4, configuration has moved from `tailwind.config.js` to pure CSS using the `@theme` directive. Because `tw-screens` historically relied on sharing the JavaScript configuration object, here is the recommended approach moving forward:

1. **CSS First**: Always prefer using Tailwind's native responsive utility classes (e.g., `hidden md:block`) instead of JavaScript hooks when possible. CSS is faster, doesn't trigger React re-renders, and avoids Server-Side Rendering (SSR) flashes of unstyled content (FOUC).
2. **When to use `tw-screens`**: Use these hooks *only* when your application requires conditional rendering of heavy components or logic changes across breakpoints (e.g., rendering a complex `Drawer` component on mobile instead of a `Sidebar`).
3. **Using with v4**: You can still use `tw-screens` in a Tailwind v4 project by defining your custom logic breakpoints directly via `create()` or `useBreakpoint()`, keeping your logical breakpoints separate from your purely visual CSS breakpoints.

---

## Problem Solved

`tw-screens` simplifies responsive UIs in React, supporting custom breakpoints and easy Tailwind integration while ensuring type safety and performance.

- **Type Safety**: Reliable, type-checked breakpoints.
- **Tailwind Integration**: Share breakpoints with Tailwind without loading the full config.
- **Performance**: Efficient breakpoint management without providers.
- **SSR Compatible**: Works smoothly with server-side rendering.
- **No Dependencies**: Lightweight and conflict-free.

---

## Contributing

We welcome contributions to improve `tw-screens`. Feel free to open issues, suggest features, or contribute code!

---

## License

`tw-screens` is MIT licensed.

---

For full documentation, please check our [documentation](./docs/README.md) folder.
