import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CircleChevronLeft, LoaderCircle, Save, X } from "lucide-react";

export default function Modal({
  title,
  open,
  cancelButtonRef,
  handleModal,
  isLoading,
  children,
  handleModalSubmit,
  className,
  modalType,
  modalFormStep,
  setModalFormStep,
  HeaderButton,
  deleteButtonText,
  disabled,
  isUpdating,
  style,
}) {
  return (
    <Transition.Root show={!open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={handleModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-400 dark:bg-black/50 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                style={style}
                className={`relative transform rounded-lg bg-white dark:bg-gray-800 dark:text-white text-left shadow-xl transition-all my-8 w-full ${className}`}
              >
                <form
                  onSubmit={handleModalSubmit}
                  className="w-full p-6 flex flex-col h-full"
                >
                  {title && (
                    <div className="w-full flex flex-col md:flex-row items-center gap-5 justify-between mb-4">
                      <h3 className="capitalize">{title}</h3>
                      <div className="flex items-center justify-end w-full md:w-auto">
                        {modalFormStep === 1 && (
                          <>{HeaderButton && <HeaderButton />}</>
                        )}
                        <div className="flex items-center end">
                          {modalFormStep > 1 && (
                            <CircleChevronLeft
                              onClick={() =>
                                setModalFormStep(modalFormStep - 1)
                              }
                              className="w-7 cursor-pointer mr-1"
                            />
                          )}
                          <X
                            className="text-red-400 w-7 cursor-pointer"
                            onClick={() => {
                              handleModal();
                              if (modalFormStep > 1) {
                                setModalFormStep(1);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col justify-between flex-1">
                    <div>{children}</div>
                    {modalType && (
                      <>
                        {modalType === "delete" ? (
                          <div className="flex items-cente justify-end mt-4 space-x-2 text-white">
                            <button
                              type="button"
                              className="btnPrimary bg-red-100 dark:bg-red-500/10 dark:text-red-300 text-red-600"
                              onClick={handleModal}
                            >
                              Cancel
                            </button>

                            {isLoading ? (
                              <div className="bg-blue/10 flex items-center justify-center rounded-md py-2 w-48">
                                <img
                                  src="/img/loading.gif"
                                  className="w-7"
                                  alt=""
                                />
                              </div>
                            ) : (
                              <button
                                disabled={disabled}
                                type="submit"
                                className="btnPrimary bg-red-600 disabled:cursor-not-allowed"
                              >
                                {deleteButtonText || "Delete"}
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-cente justify-end mt-6 space-x-2 text-white">
                            <button
                              type="button"
                              className="btnPrimary bg-red-100 dark:bg-red-500/10 dark:text-red-300 text-red-600"
                              onClick={handleModal}
                            >
                              Cancel
                            </button>
                            {isLoading ? (
                              <div className="bg-blue/10 flex items-center justify-center rounded-md py-2 w-48">
                                <img
                                  src="/img/loading.gif"
                                  className="w-7"
                                  alt=""
                                />
                              </div>
                            ) : (
                              <button
                                type="submit"
                                title={disabled && "Save & Update"}
                                disabled={disabled || isUpdating}
                                className="btnPrimary bg-green-600 disabled:cursor-not-allowed"
                              >
                                {isUpdating ? (
                                  <LoaderCircle className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Save className="w-4 h-4" />
                                )}
                                {isUpdating ? (
                                  <p>Updating</p>
                                ) : (
                                  <p>Save & Update</p>
                                )}
                              </button>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
