# Webpack Error

If you see something like this:

- "`https://nextjs.org/docs/messages/module-not-found`"
- "`Module parse failed: /path/react/react-webpack-babel/app/app.js Line 1: Unexpected reserved word`"
- "`Module parse failed: /path/react/react-webpack-babel/app/index.html Line 1: Unexpected token <`"
- "`Uncaught TypeError: Super expression must either be null or a function, not undefined`"
- "`Build failed because of webpack errors`"

Fear not! The solution is actually pretty simple.

## How to Identify

Look for the import chain in the error:

- Client component → `@/lib/utils` → `some-utils.ts` → `@prisma/client/runtime/library` + `crypto`

The error will show the file path that's trying to bundle server code. Common patterns:

- "`Module not found: Can't resolve 'fs'`" (from `@prisma/client/runtime/library.js`)
- "`Module not found: Can't resolve 'crypto'`"
- Any error mentioning `@prisma/client/runtime` in client bundle

## Do Not

You might jump to some of these favorite AI solutions:

- Create a `webpack` config for one of the `apps/`
- Allow for `eslintrc.js` to skip some expressions

No. This is bad. And lazy. Do not try to modify the `apps/` fundamental build.

## Real Solution

Generally, this occurs because of this blanket error: **by using a barrel export (ie "`export * from src/...`") you are potentially allowing `use client` components to `import` dependencies or functionalities reserved by `import "server-only"` utilities or services.**

For example, `supabase/src/admin` uses the **Admin `Supabase Client`**. So, if you barrel export this alongside, say, `supabase/src/client` which is meant for use by `client components`, then every `client component` potentially imports the admin client. **React** flags this.

Investigate for uses of this, and remove the culprit file from `index.ts` barrel exports. In the **few** files that actually rely on it, import directly (ie `import { secretThing } from @/lib/secret/src/admin.ts`).
