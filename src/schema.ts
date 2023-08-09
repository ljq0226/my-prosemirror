import { Schema } from "prosemirror-model";

export const schema = new Schema({
  nodes: {
    //顶级节点，表示整个文档。它可以包含多个 block 类型的子节点。
    doc: {
      content: "block+"
    },
    //段落节点，用于表示段落文本。它可以包含多个inline类型的子节点。
    //具有align 属性，用于指定对齐方式。parseDOM定义了如何从 DOM 元素解析为节点
    // ,toDOM定义了如何将节点渲染为 DOM 元素。
    paragraph: {
      content: "inline*",
      group: "block",
      attrs: {
        align: { default: "left" }
      },
      parseDOM: [
        {
          tag: "p",
          getAttrs(dom) {
            if (typeof dom === "string") {
              return false;
            }
            return {
              align: dom.style.textAlign || "left"
            };
          }
        }
      ],
      toDOM(node) {
        const { align } = node.attrs;
        if (!align || align === "left") {
          return ["p", 0];
        }
        return ["p", { style: `text-align: ${align}` }, 0];
      }
    },
    //文本节点，用于表示文本内容。它是inline类型的节点。
    text: {
      group: "inline"
    }
  },
  //标记：描述每个元素的解析规则和渲染规则
  marks: {
    em: {
      parseDOM: [{ tag: "i" }, { tag: "em" }, { style: "font-style=italic" }],
      toDOM() {
        return ["em", 0];
      }
    },

    strong: {
      parseDOM: [
        { tag: "strong" },
        {
          tag: "b",
          getAttrs: (node: string | HTMLElement) =>
            typeof node !== "string" &&
            node.style.fontWeight !== "normal" &&
            null
        },
        {
          style: "font-weight",
          getAttrs: (value: string | HTMLElement) =>
            typeof value === "string" &&
            /^(bold(er)?|[5-9]\d{2,})$/.test(value) &&
            null
        }
      ],
      toDOM() {
        return ["strong", 0];
      }
    },
    underline: {
      parseDOM: [{ tag: "u" }],
      toDOM() {
        return ["u", 0];
      }
    },
  }
});
