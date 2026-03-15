# Following Markdown Lint

When you see this warning:

```markdown
MD060/table-column-style: Table column style [Table pipe does not align with header for style "aligned"]markdownlintMD060
```

Fear not! The solution is actually pretty simple.

## Do Not

You might jump to some of these favorite AI solutions:

- Wrap the markdown blob in `disable lint`
- Create a dedicated `.markdownlint.jsonc` to change the rule style

No. This is bad. And lazy. Do not try to modify the `lint` fundamental rules.

## Real Solution

The proper way to format a table is not very complex:

```markdown
| Column Header 1 | Column Header 2 |
| --------------- | --------------- |
| Cell 1,1 Value  | Cell 2,2 Value  |
```

This is the **compact** style using a simple delimiter `| --- | --- |` and single spaces around cell content. It satisfies MD060 when the rule uses the default `any` style, because compact is one of the four valid styles.

**Why compact works:** The `aligned` style requires pipe characters to line up vertically—which is impractical for long content like image URLs. Compact avoids alignment entirely. With the default `any` style, a table matching any supported style passes.

## Reference

- [references/MD060.md](references/MD060.md) — Full MD060 rule documentation from markdownlint (styles: aligned, compact, tight, any)
