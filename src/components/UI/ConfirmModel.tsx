import React from "react";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  content?: string;
  okText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
  danger?: boolean;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title ='Are you sure?',
  content = 'This action cannot be undone.',
  okText = 'Yes, Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  confirmLoading = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0  bg-black/85 flex items-center justify-center z-[999] p-4">
      <div className="bg-[#1a1a1a] border-3 border-modalBg w-full max-w-md p-8 rounded-xl shadow-2xl">

        {/* Header */}
        <div className="flex items-start mb-6">
          <div className="p-3 mr-4 rounded-full bg-red-800/30 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" 
              className="w-8 h-8 text-red-500" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.332 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h2 className="text-2xl text-gray-200 font-bold leading-snug pt-1">
            {title}
          </h2>
        </div>

        {/* Content */}
        <p className="text-gray-400 mb-8 text-base">
          {content}
        </p>

        {/* Actions */}
        <div className="flex justify-end space-x-4">

          {/* Cancel */}
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium text-lg hover:bg-gray-700 border border-gray-700 transition"
          >
            {cancelText}
          </button>

          {/* Confirm */}
          <button
            onClick={onConfirm}
            disabled={confirmLoading}
            className={`px-6 py-2 bg-red-600 text-white rounded-lg font-medium text-lg 
              hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/50 transition
              ${confirmLoading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {confirmLoading ? "Processing..." : okText}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;
