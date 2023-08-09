import { FC, useState, useEffect } from "react";
import { clamp } from "lodash-es";
import { EditorView } from "prosemirror-view";
import { updateMark } from "../../commands";
import { getSelectionMark } from "../../components/EditorMenu/getSelectionMark";
import { schema } from "../../schema";

type Props = {
  editorView: EditorView;
  box: DOMRect;
};

const WIDTH = 255;
const OFFSET = 5;

export const LinkTooltip: FC<Props> = (props) => {
  const [url, setUrl] = useState("");

  const state = props.editorView.state;
  const { from, to } = state.selection;
  const start = props.editorView.coordsAtPos(from);
  const end = props.editorView.coordsAtPos(to);
  const center = Math.max((start.left + end.left) / 2, start.left + 3);
  const left = clamp(
    center - WIDTH / 2,
    props.box.left,
    props.box.right - WIDTH
  );

  useEffect(() => {
    const mark = getSelectionMark(props.editorView.state, schema.marks.link);
    if (mark) {
      setUrl(mark.attrs.href);
    }
  }, [props.editorView.state]);

  const mark = getSelectionMark(state, schema.marks.link);
  const isVisible = mark != null;

  return (
    <div
      style={{
        display: isVisible ? undefined : "none",
        position: "absolute",
        top: `${start.bottom - props.box.top + OFFSET}px`,
        left: `${left - props.box.left}px`,
        width: WIDTH,
        border: "solid 1px #ccc",
        padding: "5px",
        backgroundColor: "white",
        boxSizing: "border-box"
      }}
    >
      URL:
      <input
        type="text"
        value={url}
        onInput={(event) => {
          setUrl(event.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          updateMark(schema.marks.link, { href: url })(
            props.editorView.state,
            props.editorView.dispatch,
            props.editorView
          );
        }}
      >
        Apply
      </button>
    </div>
  );
};
