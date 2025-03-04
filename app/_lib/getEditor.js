import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import moment from "moment";

export default function getEditor(withTimeStamp = true, editable = true) {
  return useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class:
              "text-justify bg-[repeating-linear-gradient(to_bottom,_transparent,_transparent_27px,_#B2B2B278_28px)] leading-7",
          },
        },
      }),
    ],
    editable: editable,
    editorProps: {
      attributes: {
        class:
          "rounded-md  outline-none h-fit  w-full overflow-y-auto text-justified",
      },
    },
    //
    content: `${
      withTimeStamp
        ? `<< ${moment(new Date()).format("hh:mm a")} >> <p></p>`
        : ""
    }`,
  });
}
