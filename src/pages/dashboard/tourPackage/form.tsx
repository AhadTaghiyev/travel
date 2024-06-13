import { Formik, FormikHelpers, FormikValues } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FaPlusSquare } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import { useModal } from "@/hooks/useModal";
import { getTicketSchema } from "./schema";
import { IInvoiceModel } from "./types";
import { cn } from "@/lib/utils";

import CustomAutocompleteSelect from "@/components/custom/autocompleteSelect";
import CustomDateTimePicker from "@/components/custom/datePicker";
import CustomSelect from "@/components/custom/select";
import CustomTextField from "@/components/custom/input";
import { useEffect, useState } from "react";
import { apiService } from "@/server/apiServer";

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
  const { t } = useTranslation();
  const { onOpen, type, isModalSuccess } = useModal();
  const isEdit = formType === "Edit";
  const isView = formType === "View";
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
                disabled={isView}
                api="Customers/GetAll/1"
                label={t("customer")}
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
                disabled={isView}
                label={t("date")}
                value={values.date}
                toDate={new Date()}
                change={(data) => {
                  setFieldValue("date", data ?? new Date());
                }}
                hasErrorMessages={!!errors.date && !!touched.date}
                errorMessages={[t(errors.date?.toString())]}
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
              {values.isCustomerPaid && !isEdit && !isView && (
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
                        values.tourPackages.reduce(
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
            {values.tourPackages.map((tourPackage, index) => (
              <div
                key={`key-${tourPackage.id ?? tourPackage.key}`}
                className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 py-12 border-solid border-t-2 border-black/30"
              >
                {!isView && (
                  <div className="absolute right-0 top-2 flex gap-x-2">
                    {index !== 0 && (
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => {
                          const tours = cloneDeep(values.tourPackages);
                          tours.splice(index, 1);
                          setFieldValue("tourPackages", tours);
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
                    value={tourPackage.personalId ?? null}
                    change={(value) =>
                      setFieldValue(
                        `tourPackages.${index}.personalId`,
                        value ?? null
                      )
                    }
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.personalId &&
                      !!touched.tourPackages?.[index]?.personalId
                    }
                    errorMessages={[
                      t(errors.tourPackages?.[index]?.personalId?.toString()),
                    ]}
                  />
                </div>

                <div className="w-full relative">
                  <CustomAutocompleteSelect
                    disabled={isView}
                    api="Suppliers/GetAll/1"
                    label={t("supplier")}
                    refetech={!!(isModalSuccess && type === "createSupplier")}
                    value={tourPackage.supplierId ?? null}
                    optionLabel="name"
                    change={(value) => {
                      setFieldValue(
                        `tourPackages.${index}.supplierId`,
                        value ?? null
                      );
                    }}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.supplierId &&
                      !!touched.tourPackages?.[index]?.supplierId
                    }
                    errorMessages={[
                      t(errors.tourPackages?.[index]?.supplierId?.toString()),
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
                    value={tourPackage.tourId ?? null}
                    change={(value) =>
                      setFieldValue(
                        `tourPackages.${index}.tourId`,
                        value ?? null
                      )
                    }
                    refetech={!!(isModalSuccess && type === "createTour")}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.tourId &&
                      !!touched.tourPackages?.[index]?.tourId
                    }
                    errorMessages={[
                      t(errors.tourPackages?.[index]?.tourId?.toString()),
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
                    value={tourPackage.transferId ?? null}
                    change={(value) =>
                      setFieldValue(
                        `tourPackages.${index}.transferId`,
                        value ?? null
                      )
                    }
                    refetech={!!(isModalSuccess && type === "createTransfer")}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.transferId &&
                      !!touched.tourPackages?.[index]?.transferId
                    }
                    errorMessages={[
                      t(errors.tourPackages?.[index]?.transferId?.toString()),
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
                    value={tourPackage.diningId ?? null}
                    change={(value) =>
                      setFieldValue(
                        `tourPackages.${index}.diningId`,
                        value ?? null
                      )
                    }
                    refetech={!!(isModalSuccess && type === "createDining")}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.diningId &&
                      !!touched.tourPackages?.[index]?.diningId
                    }
                    errorMessages={[
                      t(errors.tourPackages?.[index]?.diningId?.toString()),
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
                    value={tourPackage.insurance ?? null}
                    change={(value) =>
                      setFieldValue(
                        `tourPackages.${index}.insurance`,
                        value ?? null
                      )
                    }
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.insurance &&
                      !!touched.tourPackages?.[index]?.insurance
                    }
                    staticOptions={[
                      { label: t("Bəli"), value: true },
                      { label: t("Xeyr"), value: false },
                    ]}
                    errorMessages={[
                      t(errors.tourPackages?.[index]?.insurance?.toString()),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    disabled={isView}
                    label={t("Otel adı")}
                    value={values.tourPackages[index].otelName}
                    change={handleChange}
                    name={`tourPackages.${index}.otelName`}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.otelName &&
                      !!touched.tourPackages?.[index]?.otelName
                    }
                    errorMessages={[
                      t(errors.tourPackages?.[index]?.otelName?.toString()),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    disabled={isView}
                    label={t("Otaq adı")}
                    value={values.tourPackages[index].roomName}
                    change={handleChange}
                    name={`tourPackages.${index}.roomName`}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.roomName &&
                      !!touched.tourPackages?.[index]?.roomName
                    }
                    errorMessages={[
                      t(errors.tourPackages?.[index]?.roomName?.toString()),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    disabled={isView}
                    label={t("Rezervasiya nömrəsi")}
                    value={values.tourPackages[index].rezervationNumber}
                    change={handleChange}
                    name={`tourPackages.${index}.rezervationNumber`}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.rezervationNumber &&
                      !!touched.tourPackages?.[index]?.rezervationNumber
                    }
                    errorMessages={[
                      t(
                        errors.tourPackages?.[
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
                    value={values.tourPackages[index].childrenCount}
                    change={handleChange}
                    type="number"
                    name={`tourPackages.${index}.childrenCount`}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.childrenCount &&
                      !!touched.tourPackages?.[index]?.childrenCount
                    }
                    errorMessages={[
                      t(
                        errors.tourPackages?.[index]?.childrenCount?.toString()
                      ),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    disabled={isView}
                    label={t("Böyüklərin sayı")}
                    value={values.tourPackages[index].adultCount}
                    change={handleChange}
                    type="number"
                    name={`tourPackages.${index}.adultCount`}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.adultCount &&
                      !!touched.tourPackages?.[index]?.adultCount
                    }
                    errorMessages={[
                      t(errors.tourPackages?.[index]?.adultCount?.toString()),
                    ]}
                  />
                </div>
                {/* <div className="w-full">
                  <CustomTextField
                    disabled={isView}
                    label={t("Referans nömrəsi")}
                    value={values.tourPackages[index].referenceNo}
                    change={handleChange}
                    type="number"
                    name={`tourPackages.${index}.referenceNo`}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.referenceNo &&
                      !!touched.tourPackages?.[index]?.referenceNo
                    }
                    errorMessages={[
                      t(errors.tourPackages?.[index]?.referenceNo?.toString()),
                    ]}
                  />
                </div> */}
                <div className="w-full h-full">
                  <CustomDateTimePicker
                    disabled={isView}
                    label={t("Gediş tarixi")}
                    value={values.tourPackages[index].dateOfDeparture}
                    change={(data) => {
                      setFieldValue(
                        `tourPackages.${index}.dateOfDeparture`,
                        data ?? new Date()
                      );
                    }}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.dateOfDeparture &&
                      !!touched.tourPackages?.[index]?.dateOfDeparture
                    }
                    errorMessages={[
                      t(
                        errors.tourPackages?.[
                          index
                        ]?.dateOfDeparture?.toString()
                      ),
                    ]}
                  />
                </div>
                <div className="w-full h-full">
                  <CustomDateTimePicker
                    disabled={isView}
                    label={t("Dönüş tarixi")}
                    value={values.tourPackages[index].returnDate}
                    change={(data) => {
                      setFieldValue(
                        `tourPackages.${index}.returnDate`,
                        data ?? new Date()
                      );
                    }}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.returnDate &&
                      !!touched.tourPackages?.[index]?.returnDate
                    }
                    errorMessages={[
                      t(errors.tourPackages?.[index]?.returnDate?.toString()),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    disabled={isView}
                    label={t("purchasePrice")}
                    value={values.tourPackages[index].purchasePrice}
                    change={handleChange}
                    type="number"
                    name={`tourPackages.${index}.purchasePrice`}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.purchasePrice &&
                      !!touched.tourPackages?.[index]?.purchasePrice
                    }
                    errorMessages={[
                      t(
                        errors.tourPackages?.[index]?.purchasePrice?.toString()
                      ),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    disabled={isView}
                    label={t("salePrice")}
                    value={values.tourPackages[index].sellingPrice}
                    change={handleChange}
                    type="number"
                    name={`tourPackages.${index}.sellingPrice`}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.sellingPrice &&
                      !!touched.tourPackages?.[index]?.sellingPrice
                    }
                    errorMessages={[
                      t(errors.tourPackages?.[index]?.sellingPrice?.toString()),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    disabled={isView}
                    label={t("discount")}
                    value={values.tourPackages[index].discount}
                    change={handleChange}
                    type="number"
                    name={`tourPackages.${index}.discount`}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.discount &&
                      !!touched.tourPackages?.[index]?.discount
                    }
                    errorMessages={[
                      t(errors.tourPackages?.[index]?.discount?.toString()),
                    ]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    disabled
                    label={t("totalSalePrice")}
                    value={
                      values.tourPackages[index].sellingPrice -
                      values.tourPackages[index].discount
                    }
                    change={handleChange}
                    type="number"
                    name={``}
                    placeholder="Avtomatik"
                  />
                </div>
              </div>
            ))}
          </div>
          {!isView && (
            <div className="w-full flex gap-x-6 justify-end mb-6">
              {/* <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  const tourPackages = cloneDeep(values.tourPackages);
                  const clonedTourPackage = cloneDeep(tourPackageInitialValues);
                  clonedTourPackage.key = shortid.generate();
                  tourPackages.push(clonedTourPackage);
                  setFieldValue("tourPackages", tourPackages);
                }}
                className="font-semibold text-blue-500 border-none cursor-pointer rounded-sm hover:bg-black/5 p-1 hover:opacity-90 transition disabled:opacity-70"
              >
                + {t("newPassenger")}
              </button> */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => navigate("/panel/tourPackage")}
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
