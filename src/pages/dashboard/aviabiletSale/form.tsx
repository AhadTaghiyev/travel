import { Formik, FormikHelpers, FormikValues } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import shortid from "shortid";

import { useModal } from "@/hooks/useModal";
import { getTicketSchema } from "./schema";
import { IInvoiceModel } from "./types";
import { cn } from "@/lib/utils";
import {
  invoiceDirectionInitialValues,
  planeTicketInitialValues,
} from "./create";

import CustomAutocompleteSelect from "@/components/custom/autocompleteSelect";
import CustomDateTimePicker from "@/components/custom/datePicker";
import CustomTextField from "@/components/custom/input";
import { useEffect, useRef, useState } from "react";
import { apiService } from "@/server/apiServer";
import { BsFileEarmarkArrowUp } from "react-icons/bs";

type FormType = "Create" | "Edit" | "View";

interface IAviabiletTicketFormProps {
  formType: FormType;
  initialValues: IInvoiceModel;
  onSubmit: (
    values: IInvoiceModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const AviabiletTicketForm = ({
  initialValues,
  onSubmit,
  formType,
}: IAviabiletTicketFormProps) => {
  const { onOpen, isModalSuccess, type } = useModal();
  const isEdit = formType === "Edit";
  const isView = formType === "View";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [advancePayment, setadvancePayment] = useState(0);
  const [selectedFileName, setSelectedFileName] = useState("");

  const fileInputRef = useRef(null);

  const fetchData = async () => {
    const res = await apiService.get(`AdvancePayments/GetByCustomer/${userId}`);
    setadvancePayment(res.data.amount);
  };
  useEffect(() => {
    if (userId != "") {
      fetchData();
    }
  }, [userId])

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
                api="Customers/GetAll/1/10000"
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
                toDate={new Date()}
                change={(data) => {
                  setFieldValue("date", data ?? new Date());
                }}
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
              {(values.isCustomerPaid || values.isSupplierPaid) && !isEdit && !isView && (
                <div className="flex flex-col gap-y-4">
                  <div className="flex flex-col sm:flex-row gap-x-4">
                    <div className="w-full">
                      <CustomAutocompleteSelect
                        api="Payments/GetAll/1"
                        label={t("Ödəniş növü")}
                        value={values.paymentId ?? null}
                        optionLabel="type"
                        change={(value) => setFieldValue("paymentId", value)}
                        hasErrorMessages={!!errors.paymentId && !!touched.paymentId}
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
                        hasErrorMessages={!!errors.paidAmount && !!touched.paidAmount}
                        errorMessages={[t(errors.paidAmount?.toString())]}
                      />
                    </div>

                    <div className="w-full">
                      <CustomTextField
                        disabled
                        label={t("Qalıq məbləğ")}
                        value={Math.max(
                          values.planeTickets.reduce(
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

                  <div className="xs:w-full md:w-1/4">
                    <CustomTextField
                      name="receiptImage"
                      type="file"
                      label={t("Attachments")}
                      value={undefined}
                      change={(e) => {
                        setFieldValue("receiptImage", e.target.files);
                        setSelectedFileName(e.target.files[0]?.name || "");
                      }}
                      hasErrorMessages={!!errors.receiptImage && !!touched.receiptImage}
                      errorMessages={[t(errors.receiptImage?.toString())]}
                      inputRef={fileInputRef}
                      className="hidden"
                      accept="image/png, image/jpeg, image/jpg"
                    />
                    <div style={{ display: "flex", justifyContent: "space-between" }} className="w-full border border-[#e5e5e5] border-solid rounded-md py-2 px-4 bg-white font-medium text-[15px] cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                      <span>{t("Attach File")}</span>
                      <span className="flex items-center text-[16px]"><BsFileEarmarkArrowUp /></span>
                    </div>
                    {selectedFileName && (
                      <div className="text-[14px] mt-1 text-gray-600">
                        {selectedFileName} {t("Selected")}
                      </div>
                    )}
                    <span className="text-[14px]">* {t("receiptImageNote")}</span>
                  </div>
                </div>

              )}
            </div>
          </div>
          <div className="mt-4">
            {values.planeTickets.map((planeTicket, index) => (
              <div
                key={`key-${planeTicket.id ?? planeTicket.key}`}
                className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 py-12 border-solid border-t-2 border-black/30"
              >
                {!isView && (
                  <div className="absolute right-0 top-2 flex gap-x-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => {
                        const tickets = cloneDeep(values.planeTickets);
                        const clonedTicketPackage = cloneDeep(planeTicket);
                        clonedTicketPackage.key = shortid.generate();
                        delete clonedTicketPackage.id;
                        tickets.splice(index + 1, 0, clonedTicketPackage);
                        setFieldValue("planeTickets", tickets);
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
                          const tickets = cloneDeep(values.planeTickets);
                          tickets.splice(index, 1);
                          setFieldValue("planeTickets", tickets);
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
                    value={planeTicket.personalId ?? null}
                    change={(value) =>
                      setFieldValue(`planeTickets.${index}.personalId`, value)
                    }
                    disabled={isView}
                    hasErrorMessages={
                      !!errors.planeTickets?.[index]?.personalId &&
                      !!touched.planeTickets?.[index]?.personalId
                    }
                    errorMessages={[
                      t(errors.planeTickets?.[index]?.personalId?.toString()),
                    ]}
                  />
                </div>
                <div className="w-full relative">
                  <CustomAutocompleteSelect
                    api="Suppliers/GetAll/1/10000"
                    label={t("supplier")}
                    value={planeTicket.supplierId ?? null}
                    optionLabel="name"
                    disabled={isView}
                    refetech={!!(isModalSuccess && type === "createSupplier")}
                    change={(value) => {
                      setFieldValue(`planeTickets.${index}.supplierId`, value);
                    }}
                    hasErrorMessages={
                      !!errors.planeTickets?.[index]?.supplierId &&
                      !!touched.planeTickets?.[index]?.supplierId
                    }
                    errorMessages={[
                      t(errors.planeTickets?.[index]?.supplierId?.toString()),
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
                    api="AirWays/GetAll/1/10000"
                    label={t("airlineName")}
                    optionLabel="name"
                    value={planeTicket.airWayId ?? null}
                    disabled={isView}
                    change={(value) =>
                      setFieldValue(`planeTickets.${index}.airWayId`, value)
                    }
                    refetech={!!(isModalSuccess && type === "createAirway")}
                    hasErrorMessages={
                      !!errors.planeTickets?.[index]?.airWayId &&
                      !!touched.planeTickets?.[index]?.airWayId
                    }
                    errorMessages={[
                      t(errors.planeTickets?.[index]?.airWayId?.toString()),
                    ]}
                  />
                  {!isView && (
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => {
                        onOpen("createAirway");
                      }}
                      className="absolute right-0 top-0 text-blue-600 border-none bg-transparent  cursor-pointer z-20 hover:opacity-90 transition disabled:opacity-70"
                    >
                      <FaPlusSquare />
                    </button>
                  )}
                </div>
                <div className="w-full">
                  <CustomTextField
                    label={t("ticketNumber")}
                    value={values.planeTickets[index].ticketNo}
                    change={handleChange}
                    disabled={isView}
                    name={`planeTickets.${index}.ticketNo`}
                    hasErrorMessages={
                      !!errors.planeTickets?.[index]?.ticketNo &&
                      !!touched.planeTickets?.[index]?.ticketNo
                    }
                    errorMessages={[
                      t(errors.planeTickets?.[index]?.ticketNo?.toString()),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    label={t("passengerName")}
                    value={values.planeTickets[index].passengerName}
                    change={handleChange}
                    disabled={isView}
                    name={`planeTickets.${index}.passengerName`}
                    hasErrorMessages={
                      !!errors.planeTickets?.[index]?.passengerName &&
                      !!touched.planeTickets?.[index]?.passengerName
                    }
                    errorMessages={[
                      t(
                        errors.planeTickets?.[index]?.passengerName?.toString()
                      ),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    label={t("segmentCount")}
                    value={values.planeTickets[index].segmentCount}
                    change={handleChange}
                    type="number"
                    disabled={isView}
                    name={`planeTickets.${index}.segmentCount`}
                    hasErrorMessages={
                      !!errors.planeTickets?.[index]?.segmentCount &&
                      !!touched.planeTickets?.[index]?.segmentCount
                    }
                    errorMessages={[
                      t(errors.planeTickets?.[index]?.segmentCount?.toString()),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    label={t("purchasePrice")}
                    value={values.planeTickets[index].purchasePrice}
                    change={handleChange}
                    type="number"
                    disabled={isView}
                    name={`planeTickets.${index}.purchasePrice`}
                    hasErrorMessages={
                      !!errors.planeTickets?.[index]?.purchasePrice &&
                      !!touched.planeTickets?.[index]?.purchasePrice
                    }
                    errorMessages={[
                      t(
                        errors.planeTickets?.[index]?.purchasePrice?.toString()
                      ),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    label={t("salePrice")}
                    value={values.planeTickets[index].sellingPrice}
                    change={handleChange}
                    disabled={isView}
                    type="number"
                    name={`planeTickets.${index}.sellingPrice`}
                    hasErrorMessages={
                      !!errors.planeTickets?.[index]?.sellingPrice &&
                      !!touched.planeTickets?.[index]?.sellingPrice
                    }
                    errorMessages={[
                      t(errors.planeTickets?.[index]?.sellingPrice?.toString()),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    label={t("discount")}
                    value={values.planeTickets[index].discount}
                    change={handleChange}
                    type="number"
                    disabled={isView}
                    name={`planeTickets.${index}.discount`}
                    hasErrorMessages={
                      !!errors.planeTickets?.[index]?.discount &&
                      !!touched.planeTickets?.[index]?.discount
                    }
                    errorMessages={[
                      t(errors.planeTickets?.[index]?.discount?.toString()),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    disabled
                    label={t("totalSalePrice")}
                    value={
                      values.planeTickets[index].sellingPrice -
                      values.planeTickets[index].discount
                    }
                    change={handleChange}
                    type="number"
                    name={``}
                    placeholder="Avtomatik"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 gap-x-4 pt-2 w-full items-center bg-[rgba(0,0,0,0.03)]">
                  {values.planeTickets[index].invoiceDirections.map(
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
                              values.planeTickets[
                                index
                              ].invoiceDirections.splice(
                                invoiceDirectionIdx,
                                1
                              );
                              setFieldValue("planeTickets", [
                                ...values.planeTickets,
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
                            values.planeTickets[index].invoiceDirections[
                              invoiceDirectionIdx
                            ].flightDate
                          }
                          change={(newValue) => {
                            setFieldValue(
                              `planeTickets.${index}.invoiceDirections.${invoiceDirectionIdx}.flightDate`,
                              newValue ?? new Date()
                            );
                          }}
                          disabled={isView}
                          hasErrorMessages={
                            !!errors.planeTickets?.[index]?.invoiceDirections?.[
                              invoiceDirectionIdx
                            ]?.flightDate &&
                            !!touched.planeTickets?.[index]
                              ?.invoiceDirections?.[invoiceDirectionIdx]
                              ?.flightDate
                          }
                          errorMessages={[
                            t(
                              errors.planeTickets?.[index]?.invoiceDirections?.[
                                invoiceDirectionIdx
                              ]?.flightDate?.toString()
                            ),
                          ]}
                        />
                        <CustomTextField
                          label={t("direction")}
                          value={
                            values.planeTickets[index].invoiceDirections[
                              invoiceDirectionIdx
                            ].direction
                          }
                          change={handleChange}
                          type="text"
                          disabled={isView}
                          name={`planeTickets.${index}.invoiceDirections.${invoiceDirectionIdx}.direction`}
                          hasErrorMessages={
                            !!errors.planeTickets?.[index]?.invoiceDirections?.[
                              invoiceDirectionIdx
                            ]?.direction &&
                            !!touched.planeTickets?.[index]
                              ?.invoiceDirections?.[invoiceDirectionIdx]
                              ?.direction
                          }
                          errorMessages={[
                            t(
                              errors.planeTickets?.[index]?.invoiceDirections?.[
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
                          values.planeTickets[index].invoiceDirections.push(
                            cloneDeep(invoiceDirectionInitialValues)
                          );
                          setFieldValue("planeTickets", [
                            ...values.planeTickets,
                          ]);
                        }}
                        className="font-semibold text-blue-500 border-none cursor-pointer rounded-sm hover:bg-black/5 p-1 hover:opacity-90 transition disabled:opacity-70"
                      >
                        + {t("newDirection")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {!isView && (
            <div className="w-full flex gap-x-6 justify-end mb-6">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  const tickets = cloneDeep(values.planeTickets);
                  const clonedTicket = cloneDeep(planeTicketInitialValues);
                  clonedTicket.key = shortid.generate();
                  tickets.push(clonedTicket);
                  setFieldValue("planeTickets", tickets);
                }}
                className="font-semibold text-blue-500 border-none cursor-pointer rounded-sm hover:bg-black/5 p-1 hover:opacity-90 transition disabled:opacity-70"
              >
                + {t("newPassenger")}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => navigate("/panel/aviabiletsale")}
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

export default AviabiletTicketForm;
