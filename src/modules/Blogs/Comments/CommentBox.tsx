import './CommentBox.css';
import '@mdxeditor/editor/style.css';
import {
  MDXEditor,
  Separator, thematicBreakPlugin, InsertThematicBreak,
  headingsPlugin, listsPlugin, quotePlugin, BlockTypeSelect, ListsToggle,
  CodeToggle, codeBlockPlugin, SandpackConfig, ConditionalContents, sandpackPlugin, codeMirrorPlugin, ChangeCodeMirrorLanguage,
  ShowSandpackInfo, InsertCodeBlock, InsertSandpack,
  tablePlugin, InsertTable, CreateLink, linkPlugin, linkDialogPlugin,
  UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin
} from '@mdxeditor/editor';

export default function CommentBox() {
  const markdown = `
World
  * Item 1
  * Item 2
  * Item 3
    * nested item
  `;
  const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();
  const simpleSandpackConfig: SandpackConfig = {
    defaultPreset: 'react',
    presets: [
      {
        label: 'React',
        name: 'react',
        meta: 'live react',
        sandpackTemplate: 'react',
        sandpackTheme: 'light',
        snippetFileName: '/App.js',
        snippetLanguage: 'jsx',
        initialSnippetContent: defaultSnippetContent
      },
    ]
  };
  return (
    <div>
      <MDXEditor
        markdown={markdown}
        contentEditableClassName="prose"
        plugins={[
          headingsPlugin(),
          quotePlugin(),
          listsPlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
          sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
          codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <Separator />
                <ListsToggle />
                <Separator />
                <BlockTypeSelect />
                <Separator />
                <CreateLink />
                <Separator />
                <InsertTable />
                <InsertThematicBreak />
                <Separator />
                <ConditionalContents
                  options={[
                    { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                    { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                    {
                      fallback: () => (<>
                        <InsertCodeBlock />
                        <InsertSandpack />
                      </>)
                    }
                  ]}
                />
              </>
            )
          })
        ]}
      />
    </div>
  );
}
