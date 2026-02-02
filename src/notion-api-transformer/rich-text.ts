import { colorMap, type RichTextItem, type DecoratorTuple } from "./lib/types";

/**
 * Convert new API rich_text array to old nested array format
 * Old format: [["text"], ["bold text", [["b"]]], ["link", [["a", "url"]]]]
 */
export function transformRichText(richText: RichTextItem[]): any[][] {
  if (!richText || richText.length === 0) {
    return [];
  }

  return richText.map((item) => {
    const text = item.plain_text || "";
    const decorators: DecoratorTuple[] = [];

    if (item.annotations) {
      if (item.annotations.bold) decorators.push(["b"]);
      if (item.annotations.italic) decorators.push(["i"]);
      if (item.annotations.strikethrough) decorators.push(["s"]);
      if (item.annotations.underline) decorators.push(["_"]);
      if (item.annotations.code) decorators.push(["c"]);
      if (item.annotations.color && item.annotations.color !== "default") {
        decorators.push(["h", colorMap[item.annotations.color] || item.annotations.color]);
      }
    }

    if (item.href) {
      decorators.push(["a", item.href]);
    }

    if (item.type === "equation" && item.equation) {
      decorators.push(["e", item.equation.expression]);
    }

    if (item.type === "mention" && item.mention) {
      if (item.mention.type === "page") {
        decorators.push(["p", item.mention.page.id]);
      } else if (item.mention.type === "user") {
        decorators.push(["u", item.mention.user.id]);
      } else if (item.mention.type === "date") {
        decorators.push(["d", JSON.stringify(item.mention.date)]);
      }
    }

    if (decorators.length === 0) {
      return [text];
    }

    return [text, decorators];
  });
}
