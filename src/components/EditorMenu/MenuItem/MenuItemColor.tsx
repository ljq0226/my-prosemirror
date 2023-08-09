import { FC, useState, useMemo } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { EditorState } from "prosemirror-state";
import { getSelectionMark } from "../getSelectionMark";
import { schema } from "../../../schema";

export type MenuItemColorProps = {
  editorState: EditorState;
  onSetColor: (color: string) => void;
  onResetColor: () => void;
};

const COLOR_LIST = ["red", "orange", "green", "cyan", "blue", "purple"];

export const MenuItemColor: FC<MenuItemColorProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: () => {
      setIsOpen(false);
    }
  });

  const selectedColor = useMemo(() => {
    const mark = getSelectionMark(props.editorState, schema.marks.color);
    return mark ? mark.attrs.color : "black";
  }, [props.editorState]);

  return (
    <div
      ref={ref}
      className="text-center w-6 h-6 bg-[#efefef] border border-black inline-block relative"
    >
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            backgroundColor: selectedColor
          }}
        />
      </button>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            padding: "10px",
            border: "solid 1px #ccc",
            backgroundColor: "white"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "4px"
            }}
          >
            {COLOR_LIST.map((COLOR) => (
              <button
                key={COLOR}
                onClick={() => {
                  props.onSetColor(COLOR);
                  setIsOpen(false);
                }}
              >
                {COLOR}
              </button>
            ))}
          </div>
          <hr />
          <div style={{ textAlign: "right" }}>
            <button
              onClick={() => {
                props.onResetColor();
                setIsOpen(false);
              }}
            >
              reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
