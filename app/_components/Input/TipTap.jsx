"use client";

import { EditorContent } from "@tiptap/react";

const TipTap = ({ editor, ...props }) => {
  return <EditorContent id="editor" editor={editor} {...props} />;
};

export default TipTap;
