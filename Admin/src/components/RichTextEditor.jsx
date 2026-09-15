import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table";
import "./RichTextEditor.css";

// Rich text editor for product descriptions: paragraphs, headings, bold/italic,
// bullet/numbered lists, and tables. Stores/loads HTML.
export default function RichTextEditor({ value, onChange, placeholder }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "rte-content",
        "data-placeholder": placeholder || "",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="rte-wrapper">
      <div className="rte-toolbar">
        <button
          type="button"
          className={editor.isActive("bold") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>
        <button
          type="button"
          className={editor.isActive("italic") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>
        <button
          type="button"
          className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </button>
        <button
          type="button"
          className={editor.isActive("heading", { level: 3 }) ? "active" : ""}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </button>
        <button
          type="button"
          className={editor.isActive("paragraph") ? "active" : ""}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          Paragraph
        </button>
        <button
          type="button"
          className={editor.isActive("bulletList") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullet List
        </button>
        <button
          type="button"
          className={editor.isActive("orderedList") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Numbered List
        </button>
        <span className="rte-toolbar-sep" />
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
        >
          Insert Table
        </button>
        <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()}>
          + Col
        </button>
        <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()}>
          + Row
        </button>
        <button type="button" onClick={() => editor.chain().focus().deleteTable().run()}>
          Delete Table
        </button>
        <span className="rte-toolbar-sep" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
