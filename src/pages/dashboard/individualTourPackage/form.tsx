import { Formik, FormikHelpers, FormikValues } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FaPlusSquare } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import shortid from "shortid";

import { tourPackageInitialValues } from "./create";
import { useModal } from "@/hooks/useModal";
import { getTicketSchema } from "./schema";
import { IInvoiceModel } from "./types";
import { cn } from "@/lib/utils";

import CustomAutocompleteSelect from "@/components/custom/autocompleteSelect";
import CustomDateTimePicker from "@/components/custom/datePicker";
import CustomTextField from "@/components/custom/input";
import CustomSelect from "@/components/custom/select";
import { useEffect, useRef, useState } from "react";
import { apiService } from "@/server/apiServer";
import { BsFileEarmarkArrowUp } from "react-icons/bs";

type FormType = "Create" | "Edit" | "View";
interface ITourPackageFormProps {
  formType: FormType;
  initialValues: IInvoiceModel;
  onSubmit: (
    values: IInvoiceModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const TourPackageForm = ({
  initialValues,
  onSubmit,
  formType,
}: ITourPackageFormProps) => {
  const { onOpen, type, isModalSuccess } = useModal();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isEdit = formType === "Edit";
  const isView = formType === "View";
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
  }, [userId]);
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
        <form onSubmit={handleSubmit} className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 items-center">
            <div className="w-full relative">
              <CustomAutocompleteSelect
                disabled={isView}
                api="Customers/GetAll/1/10000"
                label={t("customer")}
                value={values.customerId ?? null}
                optionLabel="fullName"
                change={(value) => {
                  setFieldValue("customerId", value ?? null);
                  setUserId(value);
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
                disabled={isView}
                label={t("date")}
                value={values.date}
                toDate={new Date()}
                change={(data) => {
                  setFieldValue("date", data ?? new Date());
                }}
                hasErrorMessages={!!errors.date && !!touched.date}
                errorMessages={[t(errors.date?.toString())]}
                isInvoice={true}
              />
            </div>
            <div className="w-full h-full">
              <CustomDateTimePicker
                disabled={isView}
                label={t("deadline")}
                value={values.deadLine}
                change={(data) => {
                  setFieldValue("deadLine", data ?? new Date());
                }}
                hasErrorMessages={!!errors.deadLine && !!touched.deadLine}
                errorMessages={[t(errors.deadLine?.toString())]}
                isInvoice={true}
              />
            </div>
            <div className="w-full">
              <CustomTextField
                disabled={isView}
                name="explanation"
                type="text"
                label={t("explanation")}
                value={values.explanation}
                change={handleChange}
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
              {(values.isCustomerPaid || values.isSupplierPaid) &&
                !isEdit &&
                !isView && (
                  <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col sm:flex-row gap-x-4">
                      <div className="w-full">
                        <CustomAutocompleteSelect
                          disabled={isView}
                          api="Payments/GetAll/1"
                          label={t("Ödəniş növü")}
                          value={values.paymentId ?? null}
                          optionLabel="type"
                          change={(value) =>
                            setFieldValue("paymentId", value ?? null)
                          }
                          hasErrorMessages={
                            !!errors.paymentId && !!touched.paymentId
                          }
                          errorMessages={[t(errors.paymentId?.toString() ?? "")]}
                        />
                      </div>
                      <div className="w-full">
                        <CustomTextField
                          disabled={isView}
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
                            values.individualTourPackages.reduce(
                              (acc, cur) => acc + cur.sellingPrice - cur.discount,
                              0
                            ) - values.paidAmount,
                            0
                          )}
                          // value={
                          //   values.individualTourPackages[0]
                          //     .sellingPrice -
                          //   values.individualTourPackages[0].discount
                          // }
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
            {values.individualTourPackages.map(
              (individualTourPackage, index) => {
                const isFirst = index === 0;
                return (
                  <div
                    key={`key-${individualTourPackage.id ?? individualTourPackage.key
                      }`}
                    className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 py-12 border-solid border-t-2 border-black/30"
                  >
                    {!isView && (
                      <div className="absolute right-0 top-2 flex gap-x-2">
                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => {
                            const tourPackages = cloneDeep(
                              values.individualTourPackages
                            );
                            const clonedTourPackage = cloneDeep(
                              individualTourPackage
                            );
                            clonedTourPackage.key = shortid.generate();
                            delete clonedTourPackage.id;
                            clonedTourPackage.sellingPrice = 0;
                            clonedTourPackage.purchasePrice = 0;
                            clonedTourPackage.discount = 0;
                            tourPackages.splice(
                              index + 1,
                              0,
                              clonedTourPackage
                            );
                            setFieldValue(
                              "individualTourPackages",
                              tourPackages
                            );
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
                              const tours = cloneDeep(
                                values.individualTourPackages
                              );
                              tours.splice(index, 1);
                              setFieldValue("individualTourPackages", tours);
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
                        disabled={isView}
                        api="Personals/GetAll/1"
                        label={t("personal")}
                        optionLabel="fullName"
                        value={individualTourPackage.personalId ?? null}
                        change={(value) =>
                          setFieldValue(
                            `individualTourPackages.${index}.personalId`,
                            value ?? null
                          )
                        }
                        hasErrorMessages={
                          !!errors.individualTourPackages?.[index]
                            ?.personalId &&
                          !!touched.individualTourPackages?.[index]?.personalId
                        }
                        errorMessages={[
                          t(
                            errors.individualTourPackages?.[
                              index
                            ]?.personalId?.toString()
                          ),
                        ]}
                      />
                    </div>

                    <div className="w-full relative">
                      <CustomAutocompleteSelect
                        disabled={isView}
                        api="Suppliers/GetAll/1/10000"
                        label={t("supplier")}
                        value={individualTourPackage.supplierId ?? null}
                        optionLabel="name"
                        change={(value) => {
                          setFieldValue(
                            `individualTourPackages.${index}.supplierId`,
                            value ?? null
                          );
                        }}
                        refetech={
                          !!(isModalSuccess && type === "createSupplier")
                        }
                        hasErrorMessages={
                          !!errors.individualTourPackages?.[index]
                            ?.supplierId &&
                          !!touched.individualTourPackages?.[index]?.supplierId
                        }
                        errorMessages={[
                          t(
                            errors.individualTourPackages?.[
                              index
                            ]?.supplierId?.toString()
                          ),
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
                        disabled={isView}
                        api="Tours/GetAll/1"
                        label={t("Tur Adı")}
                        optionLabel="name"
                        value={individualTourPackage.tourId ?? null}
                        change={(value) =>
                          setFieldValue(
                            `individualTourPackages.${index}.tourId`,
                            value ?? null
                          )
                        }
                        refetech={!!(isModalSuccess && type === "createTour")}
                        hasErrorMessages={
                          !!errors.individualTourPackages?.[index]?.tourId &&
                          !!touched.individualTourPackages?.[index]?.tourId
                        }
                        errorMessages={[
                          t(
                            errors.individualTourPackages?.[
                              index
                            ]?.tourId?.toString()
                          ),
                        ]}
                      />
                      {!isView && (
                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => {
                            onOpen("createTour");
                          }}
                          className="absolute right-0 top-0 text-blue-600 border-none bg-transparent  cursor-pointer z-20 hover:opacity-90 transition disabled:opacity-70"
                        >
                          <FaPlusSquare />
                        </button>
                      )}
                    </div>
                    <div className="w-full relative">
                      <CustomAutocompleteSelect
                        disabled={isView}
                        api="Transfers/GetAll/1"
                        label={t("Transfer")}
                        optionLabel="name"
                        value={individualTourPackage.transferId ?? null}
                        change={(value) =>
                          setFieldValue(
                            `individualTourPackages.${index}.transferId`,
                            value ?? null
                          )
                        }
                        refetech={
                          !!(isModalSuccess && type === "createTransfer")
                        }
                        hasErrorMessages={
                          !!errors.individualTourPackages?.[index]
                            ?.transferId &&
                          !!touched.individualTourPackages?.[index]?.transferId
                        }
                        errorMessages={[
                          t(
                            errors.individualTourPackages?.[
                              index
                            ]?.transferId?.toString()
                          ),
                        ]}
                      />
                      {!isView && (
                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => {
                            onOpen("createTransfer");
                          }}
                          className="absolute right-0 top-0 text-blue-600 border-none bg-transparent  cursor-pointer z-20 hover:opacity-90 transition disabled:opacity-70"
                        >
                          <FaPlusSquare />
                        </button>
                      )}
                    </div>
                    <div className="w-full relative">
                      <CustomAutocompleteSelect
                        disabled={isView}
                        api="Dinings/GetAll/1"
                        label={t("Yemək")}
                        optionLabel="name"
                        value={individualTourPackage.diningId ?? null}
                        change={(value) =>
                          setFieldValue(
                            `individualTourPackages.${index}.diningId`,
                            value ?? null
                          )
                        }
                        refetech={!!(isModalSuccess && type === "createDining")}
                        hasErrorMessages={
                          !!errors.individualTourPackages?.[index]?.diningId &&
                          !!touched.individualTourPackages?.[index]?.diningId
                        }
                        errorMessages={[
                          t(
                            errors.individualTourPackages?.[
                              index
                            ]?.diningId?.toString()
                          ),
                        ]}
                      />
                      {!isView && (
                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => {
                            onOpen("createDining");
                          }}
                          className="absolute right-0 top-0 text-blue-600 border-none bg-transparent  cursor-pointer z-20 hover:opacity-90 transition disabled:opacity-70"
                        >
                          <FaPlusSquare />
                        </button>
                      )}
                    </div>
                    <div className="w-full">
                      <CustomSelect
                        disabled={isView}
                        label={t("Sığorta")}
                        optionLabel="name"
                        value={individualTourPackage.insurance ?? null}
                        change={(value) =>
                          setFieldValue(
                            `individualTourPackages.${index}.insurance`,
                            value ?? null
                          )
                        }
                        hasErrorMessages={
                          !!errors.individualTourPackages?.[index]?.insurance &&
                          !!touched.individualTourPackages?.[index]?.insurance
                        }
                        staticOptions={[
                          { label: t("Bəli"), value: true },
                          { label: t("Xeyr"), value: false },
                        ]}
                        errorMessages={[
                          t(
                            errors.individualTourPackages?.[
                              index
                            ]?.insurance?.toString()
                          ),
                        ]}
                      />
                    </div>
                    <div className="w-full">
                      <CustomTextField
                        disabled={isView}
                        label={t("Otel adı")}
                        value={values.individualTourPackages[index].otelName}
                        change={handleChange}
                        name={`individualTourPackages.${index}.otelName`}
                        hasErrorMessages={
                          !!errors.individualTourPackages?.[index]?.otelName &&
                          !!touched.individualTourPackages?.[index]?.otelName
                        }
                        errorMessages={[
                          t(
                            errors.individualTourPackages?.[
                              index
                            ]?.otelName?.toString()
                          ),
                        ]}
                      />
                    </div>
                    <div className="w-full">
                      <CustomTextField
                        disabled={isView}
                        label={t("Otaq adı")}
                        value={values.individualTourPackages[index].roomName}
                        change={handleChange}
                        name={`individualTourPackages.${index}.roomName`}
                        hasErrorMessages={
                          !!errors.individualTourPackages?.[index]?.roomName &&
                          !!touched.individualTourPackages?.[index]?.roomName
                        }
                        errorMessages={[
                          t(
                            errors.individualTourPackages?.[
                              index
                            ]?.roomName?.toString()
                          ),
                        ]}
                      />
                    </div>
                    <div className="w-full">
                      <CustomTextField
                        disabled={isView}
                        label={t("Rezervasiya nömrəsi")}
                        value={
                          values.individualTourPackages[index].rezervationNumber
                        }
                        change={handleChange}
                        name={`individualTourPackages.${index}.rezervationNumber`}
                        hasErrorMessages={
                          !!errors.individualTourPackages?.[index]
                            ?.rezervationNumber &&
                          !!touched.individualTourPackages?.[index]
                            ?.rezervationNumber
                        }
                        errorMessages={[
                          t(
                            errors.individualTourPackages?.[
                              index
                            ]?.rezervationNumber?.toString()
                          ),
                        ]}
                      />
                    </div>
                    <div className="w-full">
                      <CustomTextField
                        disabled={isView}
                        label={t("Uşaqların sayı")}
                        value={
                          values.individualTourPackages[index].childrenCount
                        }
                        change={handleChange}
                        type="number"
                        name={`individualTourPackages.${index}.childrenCount`}
                        hasErrorMessages={
                          !!errors.individualTourPackages?.[index]
                            ?.childrenCount &&
                          !!touched.individualTourPackages?.[index]
                            ?.childrenCount
                        }
                        errorMessages={[
                          t(
                            errors.individualTourPackages?.[
                              index
                            ]?.childrenCount?.toString()
                          ),
                        ]}
                      />
                    </div>
                    <div className="w-full">
                      <CustomTextField
                        disabled={isView}
                        label={t("Böyüklərin sayı")}
                        value={values.individualTourPackages[index].adultCount}
                        change={handleChange}
                        type="number"
                        name={`individualTourPackages.${index}.adultCount`}
                        hasErrorMessages={
                          !!errors.individualTourPackages?.[index]
                            ?.adultCount &&
                          !!touched.individualTourPackages?.[index]?.adultCount
                        }
                        errorMessages={[
                          t(
                            errors.individualTourPackages?.[
                              index
                            ]?.adultCount?.toString()
                          ),
                        ]}
                      />
                    </div>
                    {/* <div className="w-full">
                      <CustomTextField
                        disabled={isView}
                        label={t("Referans nömrəsi")}
                        value={values.individualTourPackages[index].referenceNo}
                        change={handleChange}
                        type="number"
                        name={`individualTourPackages.${index}.referenceNo`}
                        hasErrorMessages={
                          !!errors.individualTourPackages?.[index]
                            ?.referenceNo &&
                          !!touched.individualTourPackages?.[index]?.referenceNo
                        }
                        errorMessages={[
                          t(
                            errors.individualTourPackages?.[
                              index
                            ]?.referenceNo?.toString()
                          ),
                        ]}
                      />
                    </div> */}
                    <div className="w-full h-full">
                      <CustomDateTimePicker
                        disabled={isView}
                        label={t("Gediş tarixi")}
                        value={
                          values.individualTourPackages[index].dateOfDeparture
                        }
                        change={(data) => {
                          setFieldValue(
                            `individualTourPackages.${index}.dateOfDeparture`,
                            data ?? new Date()
                          );
                        }}
                        hasErrorMessages={
                          !!errors.individualTourPackages?.[index]
                            ?.dateOfDeparture &&
                          !!touched.individualTourPackages?.[index]
                            ?.dateOfDeparture
                        }
                        errorMessages={[
                          t(
                            errors.individualTourPackages?.[
                              index
                            ]?.dateOfDeparture?.toString()
                          ),
                        ]}
                        isInvoice={true}
                      />
                    </div>
                    <div className="w-full h-full">
                      <CustomDateTimePicker
                        disabled={isView}
                        label={t("Dönüş tarixi")}
                        value={values.individualTourPackages[index].returnDate}
                        change={(data) => {
                          setFieldValue(
                            `individualTourPackages.${index}.returnDate`,
                            data ?? new Date()
                          );
                        }}
                        hasErrorMessages={
                          !!errors.individualTourPackages?.[index]
                            ?.returnDate &&
                          !!touched.individualTourPackages?.[index]?.returnDate
                        }
                        errorMessages={[
                          t(
                            errors.individualTourPackages?.[
                              index
                            ]?.returnDate?.toString()
                          ),
                        ]}
                        isInvoice={true}
                      />
                    </div>
                    {isFirst && (
                      <>
                        <div className="w-full">
                          <CustomTextField
                            disabled={isView || !isFirst}
                            label={t("purchasePrice")}
                            value={
                              values.individualTourPackages[index].purchasePrice
                            }
                            change={handleChange}
                            type="number"
                            name={`individualTourPackages.${index}.purchasePrice`}
                            hasErrorMessages={
                              !!errors.individualTourPackages?.[index]
                                ?.purchasePrice &&
                              !!touched.individualTourPackages?.[index]
                                ?.purchasePrice
                            }
                            errorMessages={[
                              t(
                                errors.individualTourPackages?.[
                                  index
                                ]?.purchasePrice?.toString()
                              ),
                            ]}
                          />
                        </div>
                        <div className="w-full">
                          <CustomTextField
                            disabled={isView || !isFirst}
                            label={t("salePrice")}
                            value={
                              values.individualTourPackages[index].sellingPrice
                            }
                            change={handleChange}
                            type="number"
                            name={`individualTourPackages.${index}.sellingPrice`}
                            hasErrorMessages={
                              !!errors.individualTourPackages?.[index]
                                ?.sellingPrice &&
                              !!touched.individualTourPackages?.[index]
                                ?.sellingPrice
                            }
                            errorMessages={[
                              t(
                                errors.individualTourPackages?.[
                                  index
                                ]?.sellingPrice?.toString()
                              ),
                            ]}
                          />
                        </div>
                        <div className="w-full">
                          <CustomTextField
                            disabled={isView || !isFirst}
                            label={t("discount")}
                            value={
                              values.individualTourPackages[index].discount
                            }
                            change={handleChange}
                            type="number"
                            name={`individualTourPackages.${index}.discount`}
                            hasErrorMessages={
                              !!errors.individualTourPackages?.[index]
                                ?.discount &&
                              !!touched.individualTourPackages?.[index]
                                ?.discount
                            }
                            errorMessages={[
                              t(
                                errors.individualTourPackages?.[
                                  index
                                ]?.discount?.toString()
                              ),
                            ]}
                          />
                        </div>

                        <div className="w-full">
                          <CustomTextField
                            disabled
                            label={t("totalSalePrice")}
                            value={
                              values.individualTourPackages[index]
                                .sellingPrice -
                              values.individualTourPackages[index].discount
                            }
                            change={handleChange}
                            type="number"
                            name={``}
                            placeholder="Avtomatik"
                          />
                        </div>
                      </>
                    )}
                  </div>
                );
              }
            )}
          </div>
          {!isView && (
            <div className="w-full flex gap-x-6 justify-end mb-6">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  const tourPackages = cloneDeep(values.individualTourPackages);
                  const clonedTourPackage = cloneDeep(tourPackageInitialValues);
                  clonedTourPackage.key = shortid.generate();
                  tourPackages.push(clonedTourPackage);
                  setFieldValue("individualTourPackages", tourPackages);
                }}
                className="font-semibold text-blue-500 border-none cursor-pointer rounded-sm hover:bg-black/5 p-1 hover:opacity-90 transition disabled:opacity-70"
              >
                + {t("New Hotel")}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => navigate("/panel/individualTourPackage")}
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

export default TourPackageForm;
