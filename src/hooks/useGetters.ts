import { useCallback, useReducer } from "react";
import { apiService } from "../server/apiServer";

const reducerActions = {
  customers: "SET_CUSTOMER",
  suppliers: "SET_SUPPLIER",
  payments: "SET_PAYMENTS",
  tours: "SET_TOURS",
  transfers: "SET_TRANSFERS",
  dinings: "SET_DININGS",
  personals: "SET_PERSONALS",
  serviceManagers: "SET_SERVICE_MANAGERS",
};
const initialState = {
  customers: [{}],
  suppliers: [{}],
  payments: [{}],
  tours: [{}],
  transfers: [{}],
  dinings: [{}],
  personals: [{}],
  serviceManagers: [{}],
};
const reducer = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case reducerActions.customers:
      return { ...state, customers: action.payload };
    case reducerActions.suppliers:
      return { ...state, suppliers: action.payload };
    case reducerActions.payments:
      return { ...state, payments: action.payload };
    case reducerActions.personals:
      return { ...state, personals: action.payload };
    case reducerActions.tours:
      return { ...state, tours: action.payload };
    case reducerActions.transfers:
      return { ...state, transfers: action.payload };
    case reducerActions.dinings:
      return { ...state, dinings: action.payload };
    case reducerActions.serviceManagers:
      return { ...state, serviceManagers: action.payload };

    default:
      return state;
  }
};

export const useGetters = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCustomers = useCallback(async () => {
    const custmersFromApi = await apiService.get("Customer/GetAll/1");
    dispatch({
      type: reducerActions.customers,
      payload: custmersFromApi.data.items,
    });
  }, []);
  const getServiceManagers = useCallback(async () => {
    const serviceManagersFromApi = await apiService.get("Services/GetAll/1");
    dispatch({
      type: reducerActions.serviceManagers,
      payload: serviceManagersFromApi.data.items,
    });
  }, []);
  const getSuppliers = useCallback(async () => {
    const suppliersFromApi = await apiService.get("Supplier/GetAll/1");
    dispatch({
      type: reducerActions.suppliers,
      payload: suppliersFromApi.data.items,
    });
  }, []);
  const getPayments = useCallback(async () => {
    const paymentsFromApi = await apiService.get("Payment/GetAll/1");
    dispatch({
      type: reducerActions.payments,
      payload: paymentsFromApi.data.items,
    });
  }, []);
  const getPersonals = useCallback(async () => {
    const personalFromApi = await apiService.get("Personal/GetAll/1");
    dispatch({
      type: reducerActions.personals,
      payload: personalFromApi.data.items,
    });
  }, []);
  const getTours = useCallback(async () => {
    const toursFromApi = await apiService.get("Tour/GetAll/1");
    dispatch({
      type: reducerActions.tours,
      payload: toursFromApi.data.items,
    });
  }, []);
  const getTransfers = useCallback(async () => {
    const transfersFromApi = await apiService.get("Transfer/GetAll/1");
    dispatch({
      type: reducerActions.transfers,
      payload: transfersFromApi.data.items,
    });
  }, []);
  const getDinings = useCallback(async () => {
    const DiningsFromApi = await apiService.get("Dining/GetAll/1");
    dispatch({
      type: reducerActions.dinings,
      payload: DiningsFromApi.data.items,
    });
  }, []);

  return {
    state,
    dispatch,
    getSuppliers,
    getCustomers,
    getPayments,
    getPersonals,
    getTours,
    getTransfers,
    getDinings,
    getServiceManagers,
  };
};
