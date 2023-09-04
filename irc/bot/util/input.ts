import type { AIChatMessage } from "../types";
// replace invalid nick chars, replace/remove trigger keywords
export function stripInitialKeyword(input: string, keyword: string) {
  return input.replace(keyword, "").trim();
}

export function replaceNameChars(input: string) {
  return input.replaceAll(/[^a-zA-Z0-9_]/g, "_");
}

function normalizeMessage(input: AIChatMessage, keyword: string) {
  if (input.name) {
    return {
      ...input,
      name: replaceNameChars(input.name),
      content: stripInitialKeyword(input.content, keyword),
    };
  } else {
    return {
      ...input,
      content: stripInitialKeyword(input.content, keyword),
    };
  }
}

export function normalizeAPIInput(
  input: AIChatMessage | AIChatMessage[] | string,
  keyword: string | null,
) {
  const word = keyword ?? "";
  if (typeof input === "string") return stripInitialKeyword(input, word);

  if (Array.isArray(input)) {
    return input.map((msg) => normalizeMessage(msg, word));
  } else {
    return normalizeMessage(input, word);
  }
}
