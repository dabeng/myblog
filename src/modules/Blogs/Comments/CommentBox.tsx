import '@mdxeditor/editor/style.css'
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin } from '@mdxeditor/editor'

export default function CommentBox() {
  return (
    <div>
      <MDXEditor
        markdown="Hello world"
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                {' '}
                <UndoRedo />
                <BoldItalicUnderlineToggles />
              </>
            )
          })
        ]}
      />
    </div>
  );
}
