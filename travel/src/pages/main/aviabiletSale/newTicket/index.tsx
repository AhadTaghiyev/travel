import { Formik, FormikHelpers, FormikValues } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaMinusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import { toast } from "react-toastify";
import { useCallback } from "react";
import * as Yup from "yup";

import { IInvoiceDirections, IInvoiceModel, IPlaneTicketModel } from "../types";
import { cn } from "@/helpers/utils";

import CustomDateTimePicker from "@/components/custom/customDateTimePicker";
import CustomAutocomplete from "@/components/custom/customAutocomplete";
import CustomTextField from "@/components/custom/customTextField";
import { apiService } from "@/server/apiServer";

const PlaneTicketSchema = Yup.object().shape({
  ticketNo: Yup.string().required("Bilet nömrəsi daxil edilməlidir"),
  passengerName: Yup.string().required("Sərnişin adı daxil edilməlidir"),
  segmentCount: Yup.number().required("Segment sayı daxil edilməlidir"),
  purchasePrice: Yup.number().required("Alış qiyməti daxil edilməlidir"),
  sellingPrice: Yup.number().required("Satış qiyməti daxil edilməlidir"),
  discount: Yup.number().required("Endirim daxil edilməlidir"),
  commonPrice: Yup.number().required("Ümumi qiymət daxil edilməlidir"),
  supplierId: Yup.string().required("Tədarikçi seçilməlidir"),
  personalId: Yup.string().required("Şəxsiyyət seçilməlidir"),
  airWayId: Yup.string().required("Aviaşirkət seçilməlidir"),
  // referanceNo: Yup.string().required("Referans nömrəsi daxil edilməlidir"),
  invoiceDirections: Yup.array().of(
    Yup.object().shape({
      flightDate: Yup.date().required("Uçuş tarixi daxil edilməlidir"),
      direction: Yup.string().required("İstiqamət daxil edilməlidir"),
    })
  ),
});

const CreateTicketSchema = Yup.object().shape({
  customerId: Yup.string().required("Müştəri seçilməlidir"),
  date: Yup.date().required(),
  deadline: Yup.date().required(),
  explanation: Yup.string(),
  isSupplierPaid: Yup.boolean(),
  isCustomerPaid: Yup.boolean(),
  paymentId: Yup.string().when("isCustomerPaid", ([isCustomerPaid], sch) => {
    return isCustomerPaid
      ? sch.required("Ödəniş növü seçilməlidir")
      : sch.notRequired();
  }),
  paidAmount: Yup.number().when("isCustomerPaid", ([isCustomerPaid], sch) => {
    return isCustomerPaid
      ? sch.required("Məbləğ daxil edilməlidir")
      : sch.notRequired();
  }),
  planeTickets: Yup.array().of(PlaneTicketSchema),
});

const invoiceDirectionInitialValues: IInvoiceDirections = {
  flightDate: new Date(),
  direction: "",
};

const planeTicketInitialValues: IPlaneTicketModel = {
  ticketNo: "",
  passengerName: "",
  segmentCount: 0,
  purchasePrice: 0,
  sellingPrice: 0,
  discount: 0,
  commonPrice: 0,
  supplierId: null,
  personalId: null,
  airWayId: null,
  referanceNo: 0,
  invoiceDirections: [cloneDeep(invoiceDirectionInitialValues)],
};

const initialValues: IInvoiceModel = {
  customerId: null,
  date: new Date(),
  deadline: new Date(),
  explanation: "",
  isSupplierPaid: false,
  isCustomerPaid: false,
  paymentId: null,
  paidAmount: 0,
  planeTickets: [cloneDeep(planeTicketInitialValues)],
};

const NewTicket = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (
      values: IInvoiceModel,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      const promise = apiService.post(`/PlaneTickets/Create`, values);

      toast.promise(promise, {
        pending: t("Loading..."),
        success: t("Uğurla yaradıldı"),
        error: t("Xəta baş verdi"),
      });

      setSubmitting(false);
    },
    []
  );

  return (
    <div className="mx-1 p-4 bg-white shadow-md min-h-[500px]">
      <h1 className="text-black text-4xl font-bold pb-4 border-b border-solid border-[#1c29400f]">
        {t("Aviabilet satışı")}
      </h1>

      <button
        onClick={() => {
          const promise = new Promise((resolve) => {
            setTimeout(() => {
              resolve("test");
            }, 1000);
          });

          toast.promise(promise, {
            pending: t("Loading..."),
            success: t("Uğurla yaradıldı"),
            error: t("Xəta baş verdi"),
          });
        }}
      >
        Test
      </button>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={CreateTicketSchema}
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
              <div className="w-full">
                <CustomAutocomplete
                  api="Customers/GetAll/1"
                  label={t("customer")}
                  initialValue={null}
                  optionLabel="fullName"
                  change={(_, data) => {
                    setFieldValue("customerId", data?.value ?? null);
                  }}
                  hasErrorMessages={!!errors.customerId && !!touched.customerId}
                  errorMessages={[t(errors.customerId?.toString())]}
                />
              </div>
              <div className="w-full h-full">
                <CustomDateTimePicker
                  label={t("date")}
                  value={values.date}
                  change={(data) => {
                    setFieldValue("date", data ?? new Date());
                  }}
                  hasErrorMessages={!!errors.date && !!touched.date}
                  errorMessages={[t(errors.date?.toString())]}
                />
              </div>
              <div className="w-full h-full">
                <CustomDateTimePicker
                  label={t("deadline")}
                  value={values.deadline}
                  change={(data) => {
                    setFieldValue("deadline", data ?? new Date());
                  }}
                  hasErrorMessages={!!errors.deadline && !!touched.deadline}
                  errorMessages={[t(errors.deadline?.toString())]}
                />
              </div>
              <div className="w-full">
                <CustomTextField
                  name="explanation"
                  type="text"
                  label={t("explanation")}
                  value={values.explanation}
                  change={handleChange}
                  hasErrorMessages={
                    !!errors.explanation && !!touched.explanation
                  }
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
                    />
                  }
                  label={t("supplierPayment")}
                />
              </div>
              <div
                className={cn(
                  "w-full border border-solid border-transparent rounded-sm flex items-center gap-x-4",
                  values.isCustomerPaid &&
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
                    />
                  }
                  label={values.isCustomerPaid ? "" : t("customerPayment")}
                />
                {values.isCustomerPaid && (
                  <div className="flex flex-col sm:flex-row gap-x-4">
                    <div className="w-full">
                      <CustomAutocomplete
                        api="Payments/GetAll/1"
                        label={t("Ödəniş növü")}
                        initialValue={null}
                        optionLabel="type"
                        change={(_, data) =>
                          setFieldValue("paymentId", data?.value ?? null)
                        }
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
                        value={
                          values.planeTickets.reduce(
                            (acc, cur) => acc + cur.sellingPrice - cur.discount,
                            0
                          ) - values.paidAmount
                        }
                        change={() => 0}
                        type="number"
                        name={``}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              {values.planeTickets.map((_, index) => (
                <div
                  key={index}
                  className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 pt-6 mb-10 border-solid border-t-2 border-black/30"
                >
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        values.planeTickets.splice(index, 1);
                        setFieldValue("planeTickets", [...values.planeTickets]);
                      }}
                      className="absolute right-0 top-2 p-1 text-sm bg-rose-500 text-white font-bold cursor-pointer z-20 hover:bg-rose-400 transition"
                    >
                      {t("Sil")}
                    </button>
                  )}
                  <div className="w-full">
                    <CustomAutocomplete
                      api="Personals/GetAll/1"
                      label={t("personal")}
                      initialValue={null}
                      optionLabel="fullName"
                      change={(_, data) =>
                        setFieldValue(
                          `planeTickets.${index}.personalId`,
                          data?.value ?? null
                        )
                      }
                      hasErrorMessages={
                        !!errors.planeTickets?.[index]?.personalId &&
                        !!touched.planeTickets?.[index]?.personalId
                      }
                      errorMessages={[
                        t(errors.planeTickets?.[index]?.personalId?.toString()),
                      ]}
                    />
                  </div>
                  <div className="w-full">
                    <CustomAutocomplete
                      api="Suppliers/GetAll/1"
                      label={t("supplier")}
                      initialValue={null}
                      optionLabel="name"
                      change={(_, data) => {
                        setFieldValue(
                          `planeTickets.${index}.supplierId`,
                          data?.value ?? null
                        );
                      }}
                      hasErrorMessages={
                        !!errors.planeTickets?.[index]?.supplierId &&
                        !!touched.planeTickets?.[index]?.supplierId
                      }
                      errorMessages={[
                        t(errors.planeTickets?.[index]?.supplierId?.toString()),
                      ]}
                    />
                  </div>
                  <div className="w-full">
                    <CustomTextField
                      label={t("ticketNumber")}
                      value={values.planeTickets[index].ticketNo}
                      change={handleChange}
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
                      name={`planeTickets.${index}.passengerName`}
                      hasErrorMessages={
                        !!errors.planeTickets?.[index]?.passengerName &&
                        !!touched.planeTickets?.[index]?.passengerName
                      }
                      errorMessages={[
                        t(
                          errors.planeTickets?.[
                            index
                          ]?.passengerName?.toString()
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
                      name={`planeTickets.${index}.segmentCount`}
                      hasErrorMessages={
                        !!errors.planeTickets?.[index]?.segmentCount &&
                        !!touched.planeTickets?.[index]?.segmentCount
                      }
                      errorMessages={[
                        t(
                          errors.planeTickets?.[index]?.segmentCount?.toString()
                        ),
                      ]}
                    />
                  </div>
                  <div className="w-full">
                    <CustomTextField
                      label={t("purchasePrice")}
                      value={values.planeTickets[index].purchasePrice}
                      change={handleChange}
                      type="number"
                      name={`planeTickets.${index}.purchasePrice`}
                      hasErrorMessages={
                        !!errors.planeTickets?.[index]?.purchasePrice &&
                        !!touched.planeTickets?.[index]?.purchasePrice
                      }
                      errorMessages={[
                        t(
                          errors.planeTickets?.[
                            index
                          ]?.purchasePrice?.toString()
                        ),
                      ]}
                    />
                  </div>
                  <div className="w-full">
                    <CustomTextField
                      label={t("salePrice")}
                      value={values.planeTickets[index].sellingPrice}
                      change={handleChange}
                      type="number"
                      name={`planeTickets.${index}.sellingPrice`}
                      hasErrorMessages={
                        !!errors.planeTickets?.[index]?.sellingPrice &&
                        !!touched.planeTickets?.[index]?.sellingPrice
                      }
                      errorMessages={[
                        t(
                          errors.planeTickets?.[index]?.sellingPrice?.toString()
                        ),
                      ]}
                    />
                  </div>
                  <div className="w-full">
                    <CustomTextField
                      label={t("discount")}
                      value={values.planeTickets[index].discount}
                      change={handleChange}
                      type="number"
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
                      name={`planeTickets[${index}].discount`}
                      placeholder="Avtomatik"
                    />
                  </div>
                  <div className="w-full">
                    <CustomAutocomplete
                      api="AirWays/GetAll/1"
                      label={t("airlineName")}
                      initialValue={null}
                      optionLabel="name"
                      change={(_, data) =>
                        setFieldValue(
                          `planeTickets.${index}.airWayId`,
                          data?.value ?? null
                        )
                      }
                      hasErrorMessages={
                        !!errors.planeTickets?.[index]?.airWayId &&
                        !!touched.planeTickets?.[index]?.airWayId
                      }
                      errorMessages={[
                        t(errors.planeTickets?.[index]?.airWayId?.toString()),
                      ]}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 gap-x-4 pt-2 w-full items-center bg-[rgba(0,0,0,0.03)]">
                    {values.planeTickets[index].invoiceDirections.map(
                      (_, invoiceDirectionIdx) => (
                        <div
                          key={invoiceDirectionIdx}
                          className="flex flex-col w-full relative"
                        >
                          {invoiceDirectionIdx !== 0 && (
                            <button
                              type="button"
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
                              className="absolute right-0 top-0 text-rose-500 border-none bg-transparent  cursor-pointer z-20 hover:opacity-90 transition"
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
                            hasErrorMessages={
                              !!errors.planeTickets?.[index]
                                ?.invoiceDirections?.[invoiceDirectionIdx]
                                ?.flightDate &&
                              !!touched.planeTickets?.[index]
                                ?.invoiceDirections?.[invoiceDirectionIdx]
                                ?.flightDate
                            }
                            errorMessages={[
                              t(
                                errors.planeTickets?.[
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
                              values.planeTickets[index].invoiceDirections[
                                invoiceDirectionIdx
                              ].direction
                            }
                            change={handleChange}
                            type="text"
                            name={`planeTickets.${index}.invoiceDirections.${invoiceDirectionIdx}.direction`}
                            hasErrorMessages={
                              !!errors.planeTickets?.[index]
                                ?.invoiceDirections?.[invoiceDirectionIdx]
                                ?.direction &&
                              !!touched.planeTickets?.[index]
                                ?.invoiceDirections?.[invoiceDirectionIdx]
                                ?.direction
                            }
                            errorMessages={[
                              t(
                                errors.planeTickets?.[
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
                    <div className="w-full">
                      <button
                        type="button"
                        onClick={() => {
                          values.planeTickets[index].invoiceDirections.push(
                            cloneDeep(invoiceDirectionInitialValues)
                          );
                          setFieldValue("planeTickets", [
                            ...values.planeTickets,
                          ]);
                        }}
                        className="font-semibold text-blue-500 border-none cursor-pointer rounded-sm hover:bg-black/5 p-1 hover:opacity-90 transition"
                      >
                        + {t("newDirection")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full flex gap-x-6 justify-end mb-6">
              <button
                type="button"
                onClick={() => {
                  setFieldValue("planeTickets", [
                    ...values.planeTickets,
                    cloneDeep(planeTicketInitialValues),
                  ]);
                }}
                className="font-semibold text-blue-500 border-none cursor-pointer rounded-sm hover:bg-black/5 p-1 hover:opacity-90 transition"
              >
                + {t("newPassenger")}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => navigate("/panel/aviabiletsale")}
                className="p-2 bg-gray-600 text-white rounded-md uppercase hover:bg-blue-500 tracking-widest transition shadow-lg"
              >
                {t("goBack")}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="p-2 bg-blue-600 text-white rounded-md uppercase hover:bg-blue-500 tracking-widest transition shadow-lg"
              >
                {t("confirm")}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default NewTicket;
