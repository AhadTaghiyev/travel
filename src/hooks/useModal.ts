import { create } from "zustand";

export type ModalType =
  | "createPersonal"
  | "createTour"
  | "createTransfer"
  | "createDining"
  | "createCustomer"
  | "createSupplier"
  | "createAirway";

export interface ModalStore {
  type: ModalType | null;
  isModalSuccess: boolean;
  onClose: () => void;
  isOpen: boolean;
  setModalSuccess: () => void;
  onOpen: (type: ModalType) => void;
}

export const useModal = create<ModalStore>((set) => ({
  data: {},
  type: null,
  isOpen: false,
  isModalSuccess: false,
  onOpen: (type) => set({ isOpen: true, type }),
  setModalSuccess: () => set({ isModalSuccess: true }),
  onClose: () => set({ isOpen: false, type: null, isModalSuccess: false }),
}));
