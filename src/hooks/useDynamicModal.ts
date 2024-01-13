import { useEffect, useMemo, useState } from "react";
import AddCustomer from "../pages/main/settings/customer/newCustomer";
import AddTour from "../pages/main/settings/tour/newTour";
import AddPersonal from "../pages/main/settings/personal/newPersonal";
import AddTransfer from "../pages/main/settings/transfer/newTransfer";
import AddDining from "../pages/main/settings/dining/newDining";
import AddSupplier from "../pages/main/settings/supplier/newSupplier";
import AddPayment from "../pages/main/settings/payment/newPayment";
import AddServiceManager from '../pages/main/settings/serviceManager/newServiceManager';


export const useDynamicModal = (
    getCustomers: () => void,
    getSuppliers: () => void,
    getDinings: () => void,
    getPayments: () => void,
    getPersonals: () => void,
    getTours: () => void,
    getTransfers: () => void,
    getServiceManagers: ()=> void,

) => {
    const [open, setOpen] = useState<boolean>(false);
    const [modalOption, setModalOption] = useState<modalOptionType | null>(
        null
    );
    const modalOptions: modalOptionType[] = useMemo(() => {
        return [
            {
                field: "Customer",
                component: AddCustomer,
                apiService: getCustomers,
            },
            {
                field: "Tour",
                component: AddTour,
                apiService: getTours,
            },
            {
                field: "Personal",
                component: AddPersonal,
                apiService: getPersonals,
            },
            {
                field: "Transfer",
                component: AddTransfer,
                apiService: getTransfers,
            },
            {
                field: "Dining",
                component: AddDining,
                apiService: getDinings,
            },
            {
                field: "Supplier",
                component: AddSupplier,
                apiService: getSuppliers,
            },
            {
                field: "Payments",
                component: AddPayment,
                apiService: getPayments,
            },
            {
                field: "ServiceManagers",
                component: AddServiceManager,
                apiService: getServiceManagers,
            },
        ];
    }, []);

    // ======================
    // Refetch updated Data
    // ======================
    useEffect(() => {
        (async () => {
            if (open || !modalOption) return;

            try {
                await modalOption.apiService();
            } catch (error) {
                console.log(error);
            }
        })();
    }, [open]);

    return {
        open,
        setOpen,
        modalOption,
        setModalOption,
        modalOptions,
    };
};

interface modalOptionType {
    field: string;
    component: React.FC<any>;
    apiService: () => void;
}
