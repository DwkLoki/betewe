import { X } from "lucide-react";

export default function LexicalImageModal({ title, children, footer, onClose, isOpen }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-2 mb-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="mb-4">{children}</div>

                {/* Footer */}
                {footer && (
                    <div className="flex justify-end border-t pt-2">{footer}</div>
                )}
            </div>
        </div>
    );
}
