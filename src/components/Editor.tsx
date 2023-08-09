import { useEffect, useRef } from "react";
import { Schema, Node, DOMParser } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { undo, redo, history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap, toggleMark } from "prosemirror-commands";
import { schema } from "../schema";


const createDoc = <T extends Schema>(html: string, pmSchema: T) => {
  const element = document.createElement("div");
  element.innerHTML = html;
  return DOMParser.fromSchema(pmSchema).parse(element);
};
const createPmState = <T extends Schema>(
  pmSchema: T,
  options: { doc?: Node } = {}
) => {
  return EditorState.create({
    doc: options.doc,
    schema: pmSchema,
    plugins: [
      history(),
      keymap({
        "Mod-z": undo,
        "Mod-y": redo,
        "Mod-Shift-z": redo
      }),
      keymap({
        "Mod-b": toggleMark(pmSchema.marks.strong),
        "Mod-i": toggleMark(pmSchema.marks.em),
        "Mod-u": toggleMark(pmSchema.marks.underline)
      }),
      keymap({
        Enter: baseKeymap["Enter"],
        Backspace: baseKeymap["Backspace"]
      }),
    ]
  });
};

export type Props = {
  initialHtml: string;
  onChangeHtml: (html: string) => void;
};

const Editor = ({ initialHtml, onChangeHtml }: Props) => {
  const elContentRef = useRef<HTMLDivElement | null>(null);
  const editorViewRef = useRef<EditorView>();

  useEffect(() => {
    //1.创建 doc 对象
    const doc = createDoc(initialHtml, schema);
    //2.创建 prosemirror state
    const state = createPmState(schema, { doc });
    //3.创建 EditorView 视图实例
    const editorView = new EditorView(elContentRef.current, {
      state,
      //处理编辑器中的事务（transaction），并在每次事务应用后更新编辑器的状态，并调用 onChangeHtml 回调函数通知外部编辑器内容的变化。
      dispatchTransaction(transaction) {
        const newState = editorView.state.apply(transaction);
        editorView.updateState(newState);
        onChangeHtml(editorView.dom.innerHTML);
      },
    });
    editorViewRef.current = editorView;

    return () => {
      editorView.destroy();
    };
  }, []);
  return (
    <div className="relative">
      <div ref={elContentRef} />
    </div>
  );

}

export default Editor
