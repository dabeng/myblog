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
import { useRef, useEffect } from 'react';
import { db } from '../../../shared/db';
import CommentService from "./comment.service";
import { useBoundStore } from '../../../shared/stores/useBoundStore';
import { useAuth } from "../../auth";

export default function CommentBox({blogId, parentCommentId = null, addToplevelComment = null, addSecondlevelComment = null}) {
  const { accessToken, id, name, username, email, roles, clearAuth } = useAuth();

  const showNotification = useBoundStore((state) => state.showNotification);
  const hideNotification = useBoundStore((state) => state.hideNotification);
  const updateNotificationContent = useBoundStore((state) => state.updateNotificationContent);
  const bindNotificationCancelHandler = useBoundStore((state) => state.bindNotificationCancelHandler);

  const cancelNotification = () => {
    hideNotification();
  };

  useEffect(() => {
    bindNotificationCancelHandler(cancelNotification);
  }, []);

  const editorRef = useRef<MDXEditorMethods>(null);
  const markdown = ``;
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
    CommentService.createComment({
      author: id,
      content: markdown,
      publishedDate: new Date(),
      blogId: blogId,
      parentCommentId: parentCommentId
    })
      .then(result => {
        if (parentCommentId) {
          addSecondlevelComment(result);
        } else {
          addToplevelComment(result);
        }
      })
      .finally(()=>{
        editorRef.current?.setMarkdown(``);
      });
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
