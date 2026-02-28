# React Doctor

For working with the **REACT DOCTOR**, a free and open source Agentic code review for `React` apps.

View the full documentation at [github.com/millionco/react-doctor](https://github.com/millionco/react-doctor).

## CLI Instructions

From the repo root:

```bash
npx -y react-doctor@latest . --project <package> --verbose
```

Replace `<package>` with the app to scan:

| App               | Package                    |
| ----------------- | -------------------------- |
| platform          | `@rowan/platform`          |
| buyer_search_tool | `@rowan/buyer-search-tool` |
| collect_tool      | `@rowan/collect-tool`      |
| valuation_tool    | `@rowan/valuation-tool`    |

Example for platform:

```bash
npx -y react-doctor@latest . --project @rowan/platform --verbose
```

Add `--diff main` to scan only files changed vs `main`.
