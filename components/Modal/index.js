import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  useImperativeHandle(ref, () => ({
    openModal() {
      setOpen(true);
    },
    closeModal() {
      setOpen(false);
      setTimeout(() => {
        props.onClose();
      }, 200);
    },
  }));

  return (
    <div
      class="fixed z-20 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          onClick={() => {
            setOpen(!open);
            setTimeout(() => {
              props.onClose();
            }, 200);
          }}
          class={
            open
              ? "ease-in duration-200 opacity-100 fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
              : "opacity-0 ease-out duration-300 fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
          }
          aria-hidden="true"
        ></div>

        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}
        <div
          class={
            open
              ? "ease-in duration-200 opacity-100 translate-y-0 sm:scale-100 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              : "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 ease-out duration-300 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          }
        >
          <div className="font-medium mx-auto" onClick={() => setOpen(false)}>
            <AiOutlineClose className="cursor-pointer ml-auto" />
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
});

export default Modal;
