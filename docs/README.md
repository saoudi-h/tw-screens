**tw-screens** • [**Docs**](globals.md)

***

# tw-screens

**⚠️ Under Construction: This package is currently in development and is not yet ready for production use.**

`tw-screens` is a library of React hooks that allows you to easily and efficiently use Tailwind CSS breakpoints. It provides a simple API to detect breakpoints defined in your Tailwind configuration.

## Features (in development)

- 🚀 Simplified usage of breakpoints defined in `tailwind.config.js`.
- 📱 Breakpoint detection for responsive interfaces.
- ⚙️ TypeScript support.

## Installation

> **Note:** The package has not yet been published on NPM. Installation instructions will be provided once the package is ready.

```bash
# This is an example installation command, to be used when the package is published
npm install tw-screens
# or
pnpm add tw-screens
```

## Basic Usage
⚠️ Important: The library is still under development. Usage examples will be added in future updates.

```typescript
import { useBreakpoint } from 'tw-screens';

// Example usage to check the 'lg' breakpoint
function MyComponent() {
  const isLargeScreen = useBreakpoint('lg');

  return (
    <div>
      {isLargeScreen ? <p>Large screen</p> : <p>Small screen</p>}
    </div>
  );
}
```

## Development Roadmap
 Project initialization.
 Configure breakpoints from tailwind.config.js.
 Create the useBreakpoint hook.
 Add full documentation.
 Publish to NPM.

## Contribution
Contributions are not yet being accepted, as the project is in the early stages of development. Stay tuned for updates!

## License
MIT
