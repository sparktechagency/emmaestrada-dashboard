
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  useAddDisclaimerMutation,
  useGetPrivacyPolicyQuery,
} from "../../redux/features/setting/settingApi";
import { Button } from "@mui/material";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const { data: privacyData, refetch } = useGetPrivacyPolicyQuery(undefined);
  const [addDisclaimer] = useAddDisclaimerMutation();

  useEffect(() => {
    if (privacyData) {
      setContent(privacyData?.content);
    }
  }, [privacyData]);

  const handleSubmit = async () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const plainText = tempDiv.innerText.trim();

    if (!plainText) {
      toast.error("Content cannot be empty");
      return;
    }

    try {
      const res = await addDisclaimer({
        type: "privacy-policy",
        content,
      }).unwrap();

      toast.success(res?.message);
      setShowEditor(false);
      refetch()
    } catch (err) {
      console.error("Error saving:", err);
      toast.error("Failed to save content");
    }
  };

  const config = React.useMemo(
    () => ({
      theme: "default",
      showCharsCounter: false,
      showWordsCounter: false,
      toolbarAdaptive: true,
      toolbarSticky: false,
      enableDragAndDropFileToEditor: false,
      allowResizeX: false,
      allowResizeY: false,
      statusbar: false,
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "table",
        "link",
        "|",
        "left",
        "center",
        "right",
        "justify",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "fullsize",
      ],
      placeholder: "Start typing...",
      useSearch: false,
      spellcheck: false,
      iframe: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      toolbarButtonSize: "small",
      readonly: false,
      style: {
        height: "60vh",
        background: "#ededeed",
      },
      observer: { timeout: 100 },
    }),
    []
  );

  return (
    <div className="bg-white h-full p-4 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-primary font-semibold">Privacy Policy</h1>
        <Button
          onClick={() => setShowEditor(!showEditor)}
          variant="contained"
          size="large"
          sx={{
            width: 150,
            background: "#8B4E2E",
            borderRadius: 2,
            "&:hover": {
              background: "#8B4E2E",
            },
          }}
        >
          Edit
        </Button>
      </div>

    

      {/* -------------- Editor ---------------- */}

      {showEditor ? (
        <div className="">
          <JoditEditor
            ref={editor}
            value={content}
            // @ts-ignore
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
          <div className="flex items-center justify-end gap-4">
            <Button
              onClick={() => setShowEditor(!showEditor)}
              variant="outlined"
              size="large"
              sx={{
                width: 150,
                height: 50,
                borderRadius: 20,
                border: "1px solid #989898",
                marginTop: 20,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              size="large"
              sx={{
                width: 150,
                height: 50,
                borderRadius: 20,
                border: "1px solid #989898",
                marginTop: 20,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              size="large"
              sx={{
                width: 150,
                height: 50,
                borderRadius: 20,
                border: "1px solid #989898",
                marginTop: 20,
              }}
            >
              Update
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              border: "1px solid #989898",
              borderRadius: 20,
              padding: "20px",
              minHeight: "600px",
              maxHeight: "600px",
              marginTop: "20px",
              color: "#121212",
              overflow: "auto",
              background: "transparent",
            }}
            dangerouslySetInnerHTML={{ __html: content || "No content yet." }}
          />
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;
