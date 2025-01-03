import Loading from "@/components/custom/loading";
import { apiService } from "@/server/apiServer";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ICompany } from "./types";
import { CompanySchema } from "./schema";
import CustomTextField from "@/components/custom/input";
import { FormHelperText, InputLabel } from "@mui/material";
import { textStyling } from "@/styles";
import { UserContext } from "@/store/UserContext";
import { CompanyContext } from "@/store/CompanyContext";
import { BsX } from "react-icons/bs";


const Company = () => {
  const [companyData, setCompanyData] = useState<ICompany>();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const { getUser } = useContext(UserContext);
  const { getCompany } = useContext(CompanyContext);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    const res = await apiService.get(`/Company`);
    if (res.status !== 200) {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel");
      }, 1000);
      return;
    }
    const { data } = res.data;
    setCompanyData(data);
    setLoading(false);
  }

  const onSubmit = (
    values: FormikValues,
    { setSubmitting }: FormikHelpers<FormikValues>
  ) => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("adress", values.adress);
    formData.append("concurency", values.concurency);
    formData.append("detail", values.detail);
    // formData.append("formFile", values.formFile);
    if (values.formFile === null) {
      // Extract the existing image name from the URL if it exists
      const existingImageName = companyData?.image;
      if (existingImageName) {
        const imageName = existingImageName; // Extracts the file name
        formData.append("formFile", imageName || ""); // Add the file name to the form data
      } else {
        formData.append("formFile", ""); // If no existing image, send empty
      }
    } else {
      formData.append("formFile", values.formFile);
    }
    if (values.companySealImage === null) {
      // Extract the existing image name from the URL if it exists
      const existingImageName = companyData?.companySealFilename;
      if (existingImageName) {
        const imageName = existingImageName; // Extracts the file name
        formData.append("companySealImage", imageName || ""); // Add the file name to the form data
      } else {
        formData.append("companySealImage", ""); // If no existing image, send empty
      }
    } else {
      formData.append("companySealImage", values.companySealImage);
    }
    apiService
      .putForm("/Company", formData)
      .then((response) => {
        if (response.status === 200) {
          getUser();
          getCompany();
          toast.success(t("Company Updated"));
        } else {
          toast.error(response.message);
        }
      })
      .finally(() => setSubmitting(false));
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="mx-1 p-4 bg-white shadow-md min-h-[500px]">
      <h1 className="text-black text-3xl font-bold pb-4 border-b border-solid border-[#1c29400f]">
        {t("Company Detail")}
      </h1>
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          name: companyData?.name,
          email: companyData?.email,
          phoneNumber: companyData?.phoneNumber,
          adress: companyData?.adress,
          concurency: companyData?.concurency,
          detail: companyData?.detail,
          formFile: companyData?.image,
          companySealImage: companyData?.companySealImage,
          id: companyData?.id
        }}
        validationSchema={CompanySchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="pt-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 items-center">

              <div className="w-full">
                <CustomTextField
                  label={t("ID")}
                  value={values.id}
                  change={handleChange}
                  name={`id`}
                  disabled
                />
              </div>
              <div className="w-full">
                <CustomTextField
                  label={t("Balance")}
                  value={companyData.bonuces}
                  change={handleChange}
                  name={`bonuces`}
                  disabled
                />
              </div>

              <div className="w-full">
                <CustomTextField
                  label={t("Ad")}
                  value={values.name}
                  change={handleChange}
                  name={`name`}
                  hasErrorMessages={!!errors.name && !!touched.name}
                  errorMessages={[t(errors.name?.toString())]}
                />
              </div>
              <div className="w-full">
                <CustomTextField
                  label={t("Email")}
                  value={values.email}
                  change={handleChange}
                  name={`email`}
                  hasErrorMessages={!!errors.email && !!touched.email}
                  errorMessages={[t(errors.email?.toString())]}
                />
              </div>

              <div className="w-full">
                <CustomTextField
                  label={t("Phone Number")}
                  value={values.phoneNumber}
                  change={handleChange}
                  name={`phoneNumber`}
                  hasErrorMessages={
                    !!errors.phoneNumber && !!touched.phoneNumber
                  }
                  errorMessages={[t(errors.phoneNumber?.toString())]}
                />
              </div>
              <div className="w-full">
                <CustomTextField
                  label={t("Adress")}
                  value={values.adress}
                  change={handleChange}
                  name={`adress`}
                  hasErrorMessages={!!errors.adress && !!touched.adress}
                  errorMessages={[t(errors.adress?.toString())]}
                />
              </div>
              <div className="w-full">
                <CustomTextField
                  label={t("Currency")}
                  value={values.concurency}
                  change={handleChange}
                  name={`concurency`}
                  hasErrorMessages={!!errors.concurency && !!touched.concurency}
                  errorMessages={[t(errors.concurency?.toString())]}
                />
              </div>
              <div className="w-full">
                <CustomTextField
                  label={t("Detail")}
                  value={values.detail}
                  change={handleChange}
                  name={`detail`}
                  hasErrorMessages={!!errors.detail && !!touched.detail}
                  errorMessages={[t(errors.detail?.toString())]}
                />
              </div>
              <div className="w-full">
                <InputLabel sx={{ mb: 1 }} style={textStyling}>
                  {t("Upload file")}
                </InputLabel>
                <input
                  className="block py-1.5 w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none "
                  id="file_input"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={(e) => {
                    setFieldValue("formFile", e.target.files?.[0]);
                  }}
                />
                {!!errors.formFile && !!touched.formFile ? (
                  <>
                    {[t(errors.formFile?.toString())]?.map((item, key) => (
                      <FormHelperText
                        key={key}
                        sx={{ color: "red", margin: 0 }}
                      >
                        {item}
                      </FormHelperText>
                    ))}
                  </>
                ) : (
                  // <div className="h-5" />
                  ""
                )}
              </div>
              <div className="w-full flex flex-col space-y-1">
                <InputLabel sx={{ mb: 1 }} style={textStyling}>
                  {t("Sign and Seal")}
                </InputLabel>
                <input
                  className="block py-1.5 w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none "
                  id="file_input"
                  type="file"
                  accept="image/png"
                  onChange={(e) => {
                    setFieldValue("companySealImage", e.target.files?.[0]);
                  }}
                />
                {!!errors.companySealImage && !!touched.companySealImage ? (
                  <>
                    {[t(errors.companySealImage?.toString())]?.map((item, key) => (
                      <FormHelperText
                        key={key}
                        sx={{ color: "red", margin: 0 }}
                      >
                        {item}
                      </FormHelperText>
                    ))}
                  </>
                ) : null}
                <span className="text-xs text-gray-600">{t("Sign and Seal image should png format")}</span>
              </div>
            </div>
            <div className="flex">
              {values.formFile && (
                <div className="w-[50%]">
                  <h1 className="text-xl font-bold tracking-wider">
                    {t("Company Image")}
                  </h1>
                  <img
                    src={
                      typeof values.formFile === "string"
                        ? values.formFile
                        : URL.createObjectURL(values.formFile as any)
                    }
                    alt="Company"
                    className="w-[300px] h-[200px] object-contain"
                  />
                </div>
              )}
              {values.companySealImage && (
                <div className="relative w-[50%]">
                  <h1 className="text-xl font-bold tracking-wider">
                    {t("Sign and Seal")}
                  </h1>
                  <img
                    src={
                      typeof values.companySealImage === "string"
                        ? values.companySealImage
                        : URL.createObjectURL(values.companySealImage as any)
                    }
                    alt="Company Seal Image"
                    className="w-[300px] h-[200px] object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFieldValue("companySealImage", null);
                      handleSubmit();
                    }}
                    className="absolute top-20 right-[0%] md:top-4 md:right-[65%] bg-transparent text-red-500 hover:text-red-700 font-bold text-xl p-2 border-0"
                  >
                    <BsX className="text-bold" size={30} />
                  </button>
                </div>
              )}

            </div>
            <div className="w-full flex gap-x-6 justify-end mb-6">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => navigate("/panel/customers")}
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
    </div>
  );
};

export default Company;
