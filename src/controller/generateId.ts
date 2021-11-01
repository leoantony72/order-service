import { customAlphabet } from "nanoid";

export function OrderId() {
  const nanoid = customAlphabet(
    "1234567890abcdefhijklmnopABCDEFGHIJKLMNOP",
    13
  );
  const id = nanoid();
  return id;
}
