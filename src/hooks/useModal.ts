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
  | "createService";

type ModalData = {
  [key: string]: any;
};

export interface ModalStore {
  type: ModalType | null;
  onSuccess?: (data: ModalData) => void;
  isModalSuccess: boolean;
  onClose: () => void;
  isOpen: boolean;
  setModalSuccess: () => void;
  onOpen: (type: ModalType, onSuccess?: (data: ModalData) => void) => void;
}

export const useModal = create<ModalStore>((set) => ({
  data: {},
  type: null,
  isOpen: false,
  isModalSuccess: false,
  onOpen: (type, onSuccess) => set({ isOpen: true, type, onSuccess }),
  setModalSuccess: () => set({ isModalSuccess: true }),
  onClose: () => set({ isOpen: false, type: null, isModalSuccess: false }),
}));
