/* This example requires Tailwind CSS v2.0+ */
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { GiPartyPopper } from "react-icons/gi";

export default function PaymentAlert({ color, data, onClose }) {
  const [open, setOpen] = useState(true);
  return (
    <div
      className="fixed z-10 inset-0 max-w-full"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      style={open ? { zIndex: 50 } : {}}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          onClick={() => {
            setOpen(false);
            onClose();
          }}
          className={
            open
              ? "ease-in duration-200 opacity-100 fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              : "ease-out duration-300 opacity-0 fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          }
          aria-hidden="true"
        ></div>

        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={
            open
              ? "ease-in duration-200 opacity-100 translate-y-0 sm:scale-100 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
              : "ease-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          }
        >
          <div>
            <div
              className={
                "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-" +
                color +
                "-100"
              }
            >
              {/* <!-- Heroicon name: outline/check --> */}
              {color === "red" ? (
                <GrClose className={`h-6 w-6`} color="red" />
              ) : (
                <GiPartyPopper className={`h-6 w-6`} color="green" />
              )}
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className={
                  color === "red"
                    ? "text-lg leading-6 font-bold text-red-600"
                    : "text-lg leading-6 font-bold text-green-600"
                }
                id="modal-title"
              >
                {color === "red"
                  ? "Payment Unsuccessful"
                  : "Payment Successful"}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {color === "red"
                    ? "Sorry! Your payment is Unsuccessful, please try again. If your money is deducted, please contact the team!"
                    : "Yay, welcome to the BENORML family. We are so happy to have to on board!"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            {color !== "red" ? (
              <button
                type="button"
                onClick={() => window.location.replace("/fitness/dashboard")}
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Go to dashboard
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onClose();
                }}
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
