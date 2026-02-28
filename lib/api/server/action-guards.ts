import { ZodSchema } from "zod";

export type SafeAction<Input, Output> = (input: Input) => Promise<Output>;

export function createPublicAction<Input, Output>(
  schema: ZodSchema<Input>,
  handler: (ctx: { input: Input }) => Promise<Output>,
): SafeAction<Input, Output> {
  return async (raw: unknown) => {
    const parsed = schema.parse(raw);
    return handler({ input: parsed });
  };
}
