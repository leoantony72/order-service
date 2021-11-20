import { customAlphabet } from "nanoid";

export function OrderId() {
  const nanoid = customAlphabet(
    "1234567890abcdefhijklmnopABCDEFGHIJKLMNOP",
    12
  );
  const id = nanoid();
  return id;
}
