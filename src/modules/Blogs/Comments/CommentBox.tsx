import './CommentBox.css';
import '@mdxeditor/editor/style.css';
import {
  MDXEditor, MDXEditorMethods,
  Separator, thematicBreakPlugin, InsertThematicBreak,
  headingsPlugin, listsPlugin, quotePlugin, BlockTypeSelect, ListsToggle,
  CodeToggle, codeBlockPlugin, SandpackConfig, ConditionalContents, sandpackPlugin, codeMirrorPlugin, ChangeCodeMirrorLanguage,
  ShowSandpackInfo, InsertCodeBlock, InsertSandpack,
  tablePlugin, InsertTable, CreateLink, linkPlugin, linkDialogPlugin,
  UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin,
  diffSourcePlugin, DiffSourceToggleWrapper
} from '@mdxeditor/editor';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../shared/db';
import { useBoundStore } from '../../../shared/stores/useBoundStore';

export default function CommentBox() {
  const showNotification = useBoundStore((state) => state.showNotification);
  const hideNotification = useBoundStore((state) => state.hideNotification);
  const updateNotificationContent = useBoundStore((state) => state.updateNotificationContent);

  const { id } = useParams();
  const editorRef = useRef<MDXEditorMethods>(null);
  const markdown = `Hello World`;
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

  const onComment = async (markdown) => {
    try {
      // TODO：add author
      await db.comments1.add({
        content: markdown,
        publishedDate: new Date(),
        blogId: Number.parseInt(id),
        parentCommentId: null
      });
    } catch ({ name, message }) {
      updateNotificationContent(`${name}: ${message}`);
      showNotification();
    }
  };

  return (
    <div>
      <MDXEditor
        ref={editorRef}
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
          diffSourcePlugin({ diffMarkdown: markdown, viewMode: 'rich-text' }),
          toolbarPlugin({
            toolbarContents: () => (
              <DiffSourceToggleWrapper>
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
              </DiffSourceToggleWrapper>
            )
          })
        ]}
      />
      <div className="is-flex is-justify-content-flex-end my-2">
        <button className="button is-primary" onClick={()=>{onComment(editorRef.current?.getMarkdown())}}>Comment</button>
      </div>
    </div>
  );
}
