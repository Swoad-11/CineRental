"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

const Modal = ({ children }) => {
  const dialogRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }, []);

  const onHide = () => router.back();

  // Close on backdrop click (outside the dialog box)
  const handleClick = (e) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    const outside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;
    if (outside) onHide();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      onClick={handleClick}
      onClose={onHide}
      className="
        w-[95vw] max-w-3xl max-h-[90vh] p-0
        rounded-xl overflow-hidden
        bg-[#111114] border border-[#C9A84C]/20
        shadow-[0_24px_64px_rgba(0,0,0,0.85)]
        text-[#F0EDE6]
        backdrop:bg-black/80 backdrop:backdrop-blur-sm
      "
    >
      {/* Gold top accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#C9A84C] via-[#C9A84C]/50 to-transparent" />

      {/* Close button — absolutely positioned over content */}
      <button
        onClick={onHide}
        aria-label="Close"
        className="
          absolute top-3 right-3 z-10
          w-8 h-8 flex items-center justify-center rounded-lg
          border border-white/10 bg-[#111114]/80 backdrop-blur-sm
          text-[#9B978D] hover:text-[#C9A84C] hover:border-[#C9A84C]/40
          transition-all duration-200 text-sm
        "
      >
        <MdClose />
      </button>

      {/* Scrollable body — no extra padding, MovieDetails owns its own layout */}
      <div className="overflow-y-auto max-h-[calc(90vh-2px)]">{children}</div>
    </dialog>,
    document.getElementById("modal-root-content"),
  );
};

export default Modal;
