import { z } from "zod";

export const UserInput = z.object({
  name: z.string(),
  username: z.string().email(),
});
