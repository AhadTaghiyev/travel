import { Formik, FormikHelpers, FormikValues } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FaPlusSquare } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import shortid from "shortid";

import { useModal } from "@/hooks/useModal";
import { getTicketSchema } from "./schema";
import { IInvoiceModel } from "./types";
import { cn } from "@/lib/utils";
import { otherServicesInitialValues } from "./create";

import CustomAutocompleteSelect from "@/components/custom/autocompleteSelect";
import CustomDateTimePicker from "@/components/custom/datePicker";
import CustomTextField from "@/components/custom/input";
import { useEffect, useState } from "react";
import { apiService } from "@/server/apiServer";

type FormType = "Create" | "Edit" | "View";

interface IOtherServicesFormProps {
  formType: FormType;
  initialValues: IInvoiceModel;
  onSubmit: (
    values: IInvoiceModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const OtherServicesForm = ({
  initialValues,
  onSubmit,
  formType,
}: IOtherServicesFormProps) => {
  const { onOpen, isModalSuccess, type } = useModal();
  const isEdit = formType === "Edit";
  const isView = formType === "View";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userId,setUserId]=useState("");
  const [advancePayment,setadvancePayment]=useState(0);

  const fetchData = async () => {
    const res = await       apiService.get(`AdvancePayments/GetByCustomer/${userId}`);
    setadvancePayment(res.data.amount);
  };
  useEffect(()=>{
    if(userId!=""){
      fetchData();
    }
  },[userId])

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={getTicketSchema(isEdit)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="pt-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 items-center">
            <div className="w-full relative">
              <CustomAutocompleteSelect
                api="Customers/GetAll/1"
                label={t("customer")}
                disabled={isView}
                value={values.customerId ?? null}
                optionLabel="fullName"
                change={(value) => {
                  setFieldValue("customerId", value ?? null);
                  setUserId(value)
                }}
                refetech={!!(isModalSuccess && type === "createCustomer")}
                hasErrorMessages={!!errors.customerId && !!touched.customerId}
                errorMessages={[t(errors.customerId?.toString())]}
              />
              {!isView && (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    onOpen("createCustomer");
                  }}
                  className="absolute right-0 top-0 text-blue-600 border-none bg-transparent  cursor-pointer z-20 hover:opacity-90 transition disabled:opacity-70"
                >
                  <FaPlusSquare />
                </button>
              )}
            </div>
            <div className="w-full h-full">
              <CustomDateTimePicker
                label={t("date")}
                value={values.date}
                change={(data) => {
                  setFieldValue("date", data ?? new Date());
                }}
                toDate={new Date()}
                disabled={isView}
                hasErrorMessages={!!errors.date && !!touched.date}
                errorMessages={[t(errors.date?.toString())]}
              />
            </div>
            <div className="w-full h-full">
              <CustomDateTimePicker
                label={t("deadline")}
                value={values.deadLine}
                change={(data) => {
                  setFieldValue("deadLine", data ?? new Date());
                }}
                disabled={isView}
                hasErrorMessages={!!errors.deadLine && !!touched.deadLine}
                errorMessages={[t(errors.deadLine?.toString())]}
              />
            </div>
            <div className="w-full">
              <CustomTextField
                name="explanation"
                type="text"
                label={t("explanation")}
                value={values.explanation}
                change={handleChange}
                disabled={isView}
                hasErrorMessages={!!errors.explanation && !!touched.explanation}
                errorMessages={[t(errors.explanation?.toString())]}
              />
            </div>
            <div className="w-full">
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="isSupplierPaid"
                    checked={values.isSupplierPaid}
                    onChange={handleChange}
                    disabled={isEdit || isView}
                  />
                }
                label={t("supplierPayment")}
              />
            </div>
            <div
              className={cn(
                "w-full border border-solid border-transparent rounded-sm flex items-center gap-x-4",
                values.isCustomerPaid &&
                  !isEdit &&
                  !isView &&
                  "col-span-1 sm:col-span-2 md:col-span-3  bg-[rgba(0,0,0,0.03)] p-2"
              )}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="isCustomerPaid"
                    checked={values.isCustomerPaid}
                    onChange={handleChange}
                    disabled={isEdit || isView}
                  />
                }
                label={
                  values.isCustomerPaid && !isEdit && !isView
                    ? ""
                    : t("customerPayment")
                }
              />
              {(values.isCustomerPaid||values.isSupplierPaid) && !isEdit && !isView && (
                <div className="flex flex-col sm:flex-row gap-x-4">
                  <div className="w-full">
                    <CustomAutocompleteSelect
                      api="Payments/GetAll/1"
                      label={t("Ödəniş növü")}
                      value={values.paymentId ?? null}
                      optionLabel="type"
                      change={(value) => setFieldValue("paymentId", value)}
                      hasErrorMessages={
                        !!errors.paymentId && !!touched.paymentId
                      }
                      errorMessages={[t(errors.paymentId?.toString() ?? "")]}
                    />
                  </div>
                  <div className="w-full">
                    <CustomTextField
                      label={t("Ödənilən məbləğ")}
                      value={values.paidAmount}
                      change={handleChange}
                      type="number"
                      name={`paidAmount`}
                      hasErrorMessages={
                        !!errors.paidAmount && !!touched.paidAmount
                      }
                      errorMessages={[t(errors.paidAmount?.toString())]}
                    />
                  </div>
                  <div className="w-full">
                    <CustomTextField
                      disabled
                      label={t("Qalıq məbləğ")}
                      value={Math.max(
                        values.otherServices.reduce(
                          (acc, cur) => acc + cur.sellingPrice - cur.discount,
                          0
                        ) - values.paidAmount,
                        0
                      )}
                      change={() => 0}
                      type="number"
                      name={``}
                    />
                  </div>
                  <div className="w-full">
                    <CustomTextField
                      label={t("Advance Payment")}
                      value={advancePayment}
                      change={handleChange}
                      type="number"
                      name={``}
                     disabled
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            {values.otherServices.map((otherService, index) => (
              <div
                key={`key-${otherService.id ?? otherService.key}`}
                className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 py-12 border-solid border-t-2 border-black/30"
              >
                {!isView && (
                  <div className="absolute right-0 top-2 flex gap-x-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => {
                        const tickets = cloneDeep(values.otherServices);
                        const clonedTicketPackage = cloneDeep(otherService);
                        clonedTicketPackage.key = shortid.generate();
                        delete clonedTicketPackage.id;
                        tickets.splice(index + 1, 0, clonedTicketPackage);
                        setFieldValue("otherServices", tickets);
                      }}
                      className="px-2 py-1 text-sm bg-blue-600 text-white font-bold cursor-pointer z-20 hover:bg-blue-500 transition disabled:opacity-70"
                    >
                      {t("Copy")}
                    </button>
                    {index !== 0 && (
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => {
                          const tickets = cloneDeep(values.otherServices);
                          tickets.splice(index, 1);
                          setFieldValue("otherServices", tickets);
                        }}
                        className="px-2 py-1 text-sm bg-rose-500 text-white font-bold cursor-pointer z-20 hover:bg-rose-400 transition disabled:opacity-70"
                      >
                        {t("Sil")}
                      </button>
                    )}
                  </div>
                )}
                <div className="w-full relative">
                  <CustomAutocompleteSelect
                    api="Personals/GetAll/1"
                    label={t("personal")}
                    optionLabel="fullName"
                    value={otherService.personalId ?? null}
                    change={(value) =>
                      setFieldValue(`otherServices.${index}.personalId`, value)
                    }
                    disabled={isView}
                    hasErrorMessages={
                      !!errors.otherServices?.[index]?.personalId &&
                      !!touched.otherServices?.[index]?.personalId
                    }
                    errorMessages={[
                      t(errors.otherServices?.[index]?.personalId?.toString()),
                    ]}
                  />
                </div>
                <div className="w-full relative">
                  <CustomAutocompleteSelect
                    api="Suppliers/GetAll/1"
                    label={t("supplier")}
                    value={otherService.supplierId ?? null}
                    optionLabel="name"
                    disabled={isView}
                    change={(value) => {
                      setFieldValue(`otherServices.${index}.supplierId`, value);
                    }}
                    refetech={!!(isModalSuccess && type === "createSupplier")}
                    hasErrorMessages={
                      !!errors.otherServices?.[index]?.supplierId &&
                      !!touched.otherServices?.[index]?.supplierId
                    }
                    errorMessages={[
                      t(errors.otherServices?.[index]?.supplierId?.toString()),
                    ]}
                  />
                  {!isView && (
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => {
                        onOpen("createSupplier");
                      }}
                      className="absolute right-0 top-0 text-blue-600 border-none bg-transparent  cursor-pointer z-20 hover:opacity-90 transition disabled:opacity-70"
                    >
                      <FaPlusSquare />
                    </button>
                  )}
                </div>
                <div className="w-full relative">
                  <CustomAutocompleteSelect
                    api="Services/GetAll/1"
                    label={t("Service")}
                    optionLabel="name"
                    value={otherService.serviceId ?? null}
                    disabled={isView}
                    change={(value) =>
                      setFieldValue(`otherServices.${index}.serviceId`, value)
                    }
                    refetech={!!(isModalSuccess && type === "createService")}
                    hasErrorMessages={
                      !!errors.otherServices?.[index]?.serviceId &&
                      !!touched.otherServices?.[index]?.serviceId
                    }
                    errorMessages={[
                      t(errors.otherServices?.[index]?.serviceId?.toString()),
                    ]}
                  />
                  {!isView && (
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => {
                        onOpen("createService");
                      }}
                      className="absolute right-0 top-0 text-blue-600 border-none bg-transparent  cursor-pointer z-20 hover:opacity-90 transition disabled:opacity-70"
                    >
                      <FaPlusSquare />
                    </button>
                  )}
                </div>
                <div className="w-full">
                  <CustomTextField
                    label={t("Servis Adı")}
                    value={values.otherServices[index].serviceName}
                    change={handleChange}
                    disabled={isView}
                    name={`otherServices.${index}.serviceName`}
                    hasErrorMessages={
                      !!errors.otherServices?.[index]?.serviceName &&
                      !!touched.otherServices?.[index]?.serviceName
                    }
                    errorMessages={[
                      t(errors.otherServices?.[index]?.serviceName?.toString()),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    label={t("purchasePrice")}
                    value={values.otherServices[index].purchasePrice}
                    change={handleChange}
                    type="number"
                    disabled={isView}
                    name={`otherServices.${index}.purchasePrice`}
                    hasErrorMessages={
                      !!errors.otherServices?.[index]?.purchasePrice &&
                      !!touched.otherServices?.[index]?.purchasePrice
                    }
                    errorMessages={[
                      t(
                        errors.otherServices?.[index]?.purchasePrice?.toString()
                      ),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    label={t("salePrice")}
                    value={values.otherServices[index].sellingPrice}
                    change={handleChange}
                    disabled={isView}
                    type="number"
                    name={`otherServices.${index}.sellingPrice`}
                    hasErrorMessages={
                      !!errors.otherServices?.[index]?.sellingPrice &&
                      !!touched.otherServices?.[index]?.sellingPrice
                    }
                    errorMessages={[
                      t(
                        errors.otherServices?.[index]?.sellingPrice?.toString()
                      ),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    label={t("discount")}
                    value={values.otherServices[index].discount}
                    change={handleChange}
                    type="number"
                    disabled={isView}
                    name={`otherServices.${index}.discount`}
                    hasErrorMessages={
                      !!errors.otherServices?.[index]?.discount &&
                      !!touched.otherServices?.[index]?.discount
                    }
                    errorMessages={[
                      t(errors.otherServices?.[index]?.discount?.toString()),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    disabled
                    label={t("totalSalePrice")}
                    value={
                      values.otherServices[index].sellingPrice -
                      values.otherServices[index].discount
                    }
                    change={handleChange}
                    type="number"
                    name={``}
                    placeholder="Avtomatik"
                  />
                </div>
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 gap-x-4 pt-2 w-full items-center bg-[rgba(0,0,0,0.03)]">
                  {values.otherServices[index].invoiceDirections.map(
                    (_, invoiceDirectionIdx) => (
                      <div
                        key={invoiceDirectionIdx}
                        className="flex flex-col w-full relative"
                      >
                        {!isView && invoiceDirectionIdx !== 0 && (
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => {
                              values.otherServices[
                                index
                              ].invoiceDirections.splice(
                                invoiceDirectionIdx,
                                1
                              );
                              setFieldValue("otherServices", [
                                ...values.otherServices,
                              ]);
                            }}
                            className="absolute right-0 top-0 text-rose-500 border-none bg-transparent  cursor-pointer z-20 hover:opacity-90 transition disabled:opacity-70"
                          >
                            <FaMinusSquare />
                          </button>
                        )}
                        <CustomDateTimePicker
                          label={t("flightDate")}
                          value={
                            values.otherServices[index].invoiceDirections[
                              invoiceDirectionIdx
                            ].flightDate
                          }
                          change={(newValue) => {
                            setFieldValue(
                              `otherServices.${index}.invoiceDirections.${invoiceDirectionIdx}.flightDate`,
                              newValue ?? new Date()
                            );
                          }}
                          disabled={isView}
                          hasErrorMessages={
                            !!errors.otherServices?.[index]
                              ?.invoiceDirections?.[invoiceDirectionIdx]
                              ?.flightDate &&
                            !!touched.otherServices?.[index]
                              ?.invoiceDirections?.[invoiceDirectionIdx]
                              ?.flightDate
                          }
                          errorMessages={[
                            t(
                              errors.otherServices?.[
                                index
                              ]?.invoiceDirections?.[
                                invoiceDirectionIdx
                              ]?.flightDate?.toString()
                            ),
                          ]}
                        />
                        <CustomTextField
                          label={t("direction")}
                          value={
                            values.otherServices[index].invoiceDirections[
                              invoiceDirectionIdx
                            ].direction
                          }
                          change={handleChange}
                          type="text"
                          disabled={isView}
                          name={`otherServices.${index}.invoiceDirections.${invoiceDirectionIdx}.direction`}
                          hasErrorMessages={
                            !!errors.otherServices?.[index]
                              ?.invoiceDirections?.[invoiceDirectionIdx]
                              ?.direction &&
                            !!touched.otherServices?.[index]
                              ?.invoiceDirections?.[invoiceDirectionIdx]
                              ?.direction
                          }
                          errorMessages={[
                            t(
                              errors.otherServices?.[
                                index
                              ]?.invoiceDirections?.[
                                invoiceDirectionIdx
                              ]?.direction?.toString()
                            ),
                          ]}
                        />
                      </div>
                    )
                  )}
                  {!isView && (
                    <div className="w-full">
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => {
                          values.otherServices[index].invoiceDirections.push(
                            cloneDeep(invoiceDirectionInitialValues)
                          );
                          setFieldValue("otherServices", [
                            ...values.otherServices,
                          ]);
                        }}
                        className="font-semibold text-blue-500 border-none cursor-pointer rounded-sm hover:bg-black/5 p-1 hover:opacity-90 transition disabled:opacity-70"
                      >
                        + {t("newDirection")}
                      </button>
                    </div>
                  )}
                </div> */}
              </div>
            ))}
          </div>
          {!isView && (
            <div className="w-full flex gap-x-6 justify-end mb-6">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  const tickets = cloneDeep(values.otherServices);
                  const clonedTicket = cloneDeep(otherServicesInitialValues);
                  clonedTicket.key = shortid.generate();
                  tickets.push(clonedTicket);
                  setFieldValue("otherServices", tickets);
                }}
                className="font-semibold text-blue-500 border-none cursor-pointer rounded-sm hover:bg-black/5 p-1 hover:opacity-90 transition disabled:opacity-70"
              >
                + {t("newPassenger")}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => navigate("/panel/otherService")}
                className="p-2 bg-gray-600 text-white rounded-md uppercase hover:bg-blue-500 tracking-widest transition shadow-lg disabled:opacity-70"
              >
                {t("goBack")}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="p-2 bg-blue-600 text-white rounded-md uppercase hover:bg-blue-500 tracking-widest transition shadow-lg disabled:opacity-70"
              >
                {t("confirm")}
              </button>
            </div>
          )}
        </form>
      )}
    </Formik>
  );
};

export default OtherServicesForm;
