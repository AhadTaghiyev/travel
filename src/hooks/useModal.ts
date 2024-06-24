import { create } from "zustand";

export type ModalType =
  | "createPersonal"
  | "createTour"
  | "createTransfer"
  | "createDining"
  | "createCustomer"
  | "createSupplier"
  | "createAirway"
  | "createCurrency"
  | "createService"
  | "addBalance"
  | "sendMail";

type ModalData = {
  [key: string]: any;
};

export interface ModalStore {
  data?: ModalData;
  type: ModalType | null;
  onSuccess?: (data: ModalData) => void;
  isModalSuccess: boolean;
  onClose: () => void;
  isOpen: boolean;
  setModalSuccess: () => void;
  onOpen: (
    type: ModalType,
    onSuccess?: (data: ModalData) => void,
    data?: ModalData
  ) => void;
}

export const useModal = create<ModalStore>((set) => ({
  data: {},
  type: null,
  isOpen: false,
  isModalSuccess: false,
  onOpen: (type, onSuccess, data) =>
    set({ isOpen: true, type, onSuccess, data }),
  setModalSuccess: () => set({ isModalSuccess: true }),
  onClose: () => set({ isOpen: false, type: null, isModalSuccess: false }),
}));
