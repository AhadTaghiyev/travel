interface IModalProps {
  onModalClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ onModalClose, children, title }: IModalProps) => {
  return (
    <>
      <div
        onClick={onModalClose}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[10000] outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div
            onClick={(e) => e.stopPropagation()}
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            <div className="relative bg-white rounded-lg shadow w-[400px] max-w-full">
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={onModalClose}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-[9999] bg-black"></div>
    </>
  );
};
