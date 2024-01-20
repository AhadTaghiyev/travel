import { Formik, FormikHelpers, FormikValues } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FaPlusSquare } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";

import { tourPackageInitialValues } from "./newTourPackage";
import { getTicketSchema } from "./schema";
import { IInvoiceModel } from "./types";
import { cn } from "@/helpers/utils";

import CustomDateTimePicker from "@/components/custom/customDateTimePicker";
import CustomAutocomplete from "@/components/custom/customAutocomplete";
import CustomTextField from "@/components/custom/customTextField";
import { useModal } from "@/hooks/useModal";

interface ITourPackageFormProps {
  isEdit?: boolean;
  initialValues: IInvoiceModel;
  onSubmit: (
    values: IInvoiceModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const TourPackageForm = ({
  initialValues,
  onSubmit,
  isEdit = false,
}: ITourPackageFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { onOpen, type, isModalSuccess } = useModal();

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
              <CustomAutocomplete
                api="Customers/GetAll/1"
                label={t("customer")}
                initialValue={values.customerId ?? null}
                optionLabel="fullName"
                change={(_, data) => {
                  setFieldValue("customerId", data?.value ?? null);
                }}
                refetech={!!(isModalSuccess && type === "createCustomer")}
                hasErrorMessages={!!errors.customerId && !!touched.customerId}
                errorMessages={[t(errors.customerId?.toString())]}
              />
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
                    disabled={isEdit}
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
                    disabled={isEdit}
                  />
                }
                label={
                  values.isCustomerPaid && !isEdit ? "" : t("customerPayment")
                }
              />
              {values.isCustomerPaid && !isEdit && (
                <div className="flex flex-col sm:flex-row gap-x-4">
                  <div className="w-full">
                    <CustomAutocomplete
                      api="Payments/GetAll/1"
                      label={t("Ödəniş növü")}
                      initialValue={values.paymentId ?? null}
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
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            {values.tourPackages.map((planeTicket, index) => (
              <div
                key={index}
                className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 py-12 border-solid border-t-2 border-black/30"
              >
                {index !== 0 && (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      values.tourPackages.splice(index, 1);
                      setFieldValue("tourPackages", [...values.tourPackages]);
                    }}
                    className="absolute right-0 top-2 p-1 text-sm bg-rose-500 text-white font-bold cursor-pointer z-20 hover:bg-rose-400 transition disabled:opacity-70"
                  >
                    {t("Sil")}
                  </button>
                )}
                <div className="w-full relative">
                  <CustomAutocomplete
                    api="Personals/GetAll/1"
                    label={t("personal")}
                    optionLabel="fullName"
                    initialValue={planeTicket.personalId ?? null}
                    change={(_, data) =>
                      setFieldValue(
                        `tourPackages.${index}.personalId`,
                        data?.value ?? null
                      )
                    }
                    refetech={!!(isModalSuccess && type === "createPersonal")}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.personalId &&
                      !!touched.tourPackages?.[index]?.personalId
                    }
                    errorMessages={[
                      t(errors.tourPackages?.[index]?.personalId?.toString()),
                    ]}
                  />
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      onOpen("createPersonal");
                    }}
                    className="absolute right-0 top-0 text-blue-600 border-none bg-transparent  cursor-pointer z-20 hover:opacity-90 transition disabled:opacity-70"
                  >
                    <FaPlusSquare />
                  </button>
                </div>

                <div className="w-full relative">
                  <CustomAutocomplete
                    api="Suppliers/GetAll/1"
                    label={t("supplier")}
                    initialValue={planeTicket.supplierId ?? null}
                    optionLabel="name"
                    change={(_, data) => {
                      setFieldValue(
                        `tourPackages.${index}.supplierId`,
                        data?.value ?? null
                      );
                    }}
                    refetech={!!(isModalSuccess && type === "createSupplier")}
                    hasErrorMessages={
                      !!errors.tourPackages?.[index]?.supplierId &&
                      !!touched.tourPackages?.[index]?.supplierId
                    }
                    errorMessages={[
                      t(errors.tourPackages?.[index]?.supplierId?.toString()),
                    ]}
                  />
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
                </div>
                <div className="w-full relative">
                  <CustomAutocomplete
                    api="Tours/GetAll/1"
                    label={t("Tur adı")}
                    optionLabel="name"
                    initialValue={planeTicket.tourId ?? null}
                    change={(_, data) =>
                      setFieldValue(
                        `tourPackages.${index}.tourId`,
                        data?.value ?? null
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
                </div>
                <div className="w-full relative">
                  <CustomAutocomplete
                    api="Transfers/GetAll/1"
                    label={t("Transfer")}
                    optionLabel="name"
                    initialValue={planeTicket.transferId ?? null}
                    change={(_, data) =>
                      setFieldValue(
                        `tourPackages.${index}.transferId`,
                        data?.value ?? null
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
                </div>
                <div className="w-full relative">
                  <CustomAutocomplete
                    api="Dinings/GetAll/1"
                    label={t("Yemək")}
                    optionLabel="name"
                    initialValue={planeTicket.diningId ?? null}
                    change={(_, data) =>
                      setFieldValue(
                        `tourPackages.${index}.diningId`,
                        data?.value ?? null
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
                </div>
                <div className="w-full">
                  <CustomAutocomplete
                    label={t("Sığorta")}
                    optionLabel="name"
                    initialValue={planeTicket.insurance ?? null}
                    change={(_, data) =>
                      setFieldValue(
                        `tourPackages.${index}.insurance`,
                        data?.value ?? null
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
                <div className="w-full">
                  <CustomTextField
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
                </div>
                <div className="w-full h-full">
                  <CustomDateTimePicker
                    label={t("Gediş tarixi")}
                    value={values.dateOfDeparture}
                    change={(data) => {
                      setFieldValue("dateOfDeparture", data ?? new Date());
                    }}
                    hasErrorMessages={
                      !!errors.dateOfDeparture && !!touched.dateOfDeparture
                    }
                    errorMessages={[t(errors.dateOfDeparture?.toString())]}
                  />
                </div>
                <div className="w-full h-full">
                  <CustomDateTimePicker
                    label={t("Dönüş tarixi")}
                    value={values.returnDate}
                    change={(data) => {
                      setFieldValue("returnDate", data ?? new Date());
                    }}
                    hasErrorMessages={
                      !!errors.returnDate && !!touched.returnDate
                    }
                    errorMessages={[t(errors.returnDate?.toString())]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
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
                    name={`tourPackages[${index}].discount`}
                    placeholder="Avtomatik"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex gap-x-6 justify-end mb-6">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                setFieldValue("tourPackages", [
                  ...values.tourPackages,
                  cloneDeep(tourPackageInitialValues),
                ]);
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
        </form>
      )}
    </Formik>
  );
};

export default TourPackageForm;
