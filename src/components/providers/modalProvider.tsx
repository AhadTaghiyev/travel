import { CreatePersonalModal } from "@/components/modals/createPersonal";
import { CreateTransferModal } from "@/components/modals/createTransfer";
import { CreateSupplierModal } from "@/components/modals/createSupplier";
import { CreateCustomerModal } from "@/components/modals/createCustomer";
import { CreateCurrencyModal } from "@/components/modals/createCurrency";
import { CreateAirwayModal } from "@/components/modals/createAirway";
import { CreateDiningModal } from "@/components/modals/createDining";
import { CreateTourModal } from "@/components/modals/createTour";

export const ModalProvider = () => {
  return (
    <>
      <CreatePersonalModal />
      <CreateTransferModal />
      <CreateCustomerModal />
      <CreateSupplierModal />
      <CreateCurrencyModal />
      <CreateDiningModal />
      <CreateAirwayModal />
      <CreateTourModal />
    </>
  );
};
