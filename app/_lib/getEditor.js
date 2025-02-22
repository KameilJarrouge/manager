import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import moment from "moment";

export default function getEditor() {
  return useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class:
              "text-justify bg-[repeating-linear-gradient(to_bottom,_transparent,_transparent_27px,_#B2B2B278_28px)] bg-local leading-7",
          },
        },
      }),
    ],
    editable: true,
    editorProps: {
      attributes: {
        class:
          "rounded-md px-4 py-5 outline-none h-[calc(100vh-9.25rem)] overflow-y-auto",
      },
    },

    content: `<< ${moment(new Date()).format("hh:mm a")} >> <p></p>`,
  });
}
