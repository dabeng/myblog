import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
import { db } from '../../shared/db';

export default function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contentInitVal, setContentInitVal] = useState(undefined);
  const getBlogById = async () => {
    if (id) {
      const blog = await db.blogs
        .where('id')
        .equals(Number.parseInt(id))
        .first();
      setContentInitVal(blog.content);
      return blog;
    } else {
      setContentInitVal(``);
      return null;
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: getBlogById
  });

  let isContentChanged = false;
  const onContentChange = () => {
    isContentChanged = true;
  };

  const addBlog = async (data) => {
    try {
      // TODO：add author
      data.publishedDate = new Date();
      data.content = contentRef.current?.getMarkdown();
      const id = await db.blogs.add(data);
      navigate('/blogs');
    } catch (error) {
      // TODO: output error message
    }
  };

  const updateBlog = async (data) => {
    try {
      // 这里对react hook form控制下的字段和MDXEditor提供的字段，分别甄别是否被改动
      if (Object.keys(dirtyFields).length === 0 && !isContentChanged) {
        return;
      }
      const updatedData = {};
      for (const key of Object.keys(dirtyFields)) {
        updatedData[key] = data[key];
      }
      updatedData['updatedDate'] = new Date();
      updatedData['content'] = contentRef.current?.getMarkdown();
      await db.blogs.update(Number.parseInt(id), { ...updatedData });
      navigate('/blogs');
    } catch (error) {
      // TODO: output error message
    }
  };

  const onSubmit = (data) => {
    if (!id) {
      addBlog(data);
    } else {
      updateBlog(data);
    }
  };

  const resetForm = () => {
    reset(); // 这个是恢复react hook form字段到初值
    contentRef.current?.setMarkdown(contentInitVal); // 单独处理MEDEditor形式的content字段，恢复到初值
  };

  const cancelForm = () => {
    navigate('/blogs');
  };

  const contentRef = useRef<MDXEditorMethods>(null);
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
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          {/* register your input into the hook by invoking the "register" function */}
          {/* include validation with required or other standard HTML validation rules */}
          <input
            className="input"
            type="text"
            {...register('title', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.content && <span>This field is required</span>}
        </div>
      </div>
      <div className="field">
        <label className="label">SubTitle</label>
        <div className="control">
          <input className="input" type="text" {...register('subtitle')} />
        </div>
      </div>
      <div className="field">
        <label className="label">Content</label>
        <div className="control">
          {contentInitVal !== undefined &&
            <MDXEditor
              ref={contentRef}
              onChange={onContentChange}
              markdown={contentInitVal}
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
                diffSourcePlugin({ diffMarkdown: contentInitVal, viewMode: 'rich-text' }),
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
          }
          {errors.content && <span>This field is required</span>}
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            Save
          </button>
        </div>
        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={cancelForm}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}