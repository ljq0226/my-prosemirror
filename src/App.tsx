import { useState } from "react";
import Editor from "./components/Editor";

const INITIAL_HTML = `
<p style="text-align: center">He<strong>llo!</strong>__<span style="font-size: 20px;"><span style="color: orange">World</span></span></p>
<p><u><span style="font-size: 24px">你好啊</span></u><em><u>阿萨德</u></em></p>
<p><a href="https://google.com" target="_blank">Google</a></p>
<p style="text-align: right"><a href="https://github.com/ljq0226/my-prosemirror" target="_blank">GitHub</p>
`;
function App() {
  const [html, setHtml] = useState(INITIAL_HTML);
  return (
    <div className="h-screen w-screen p-[200px] bg-slate-300">
      <h1 className="text-center text-2xl">My-ProseMirror-Editor</h1>
      <div className="h-[800px] bg-white w-full py-10 px-8">
        <Editor
          initialHtml={html}
          onChangeHtml={(newHtml: string) => {
            setHtml(newHtml);
          }}
        />
        <div className="w-full h-1 bg-black" />
        <div>
          <h3>原生HTML</h3>
          <div>{html}</div>
        </div>
        <div className="w-full h-1 bg-black" />
        <div>
          <h3>渲染后</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: html
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
