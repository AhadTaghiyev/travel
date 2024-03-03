// @ts-nocheck
import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { AboutSchema } from "./schema";
import { IAboutModel } from "./types";

import CustomTextField from "@/components/custom/input";

type FormType = "Edit" | "Create" | "View";

interface IAboutProps {
  formType: FormType;
  initialValues: IAboutModel;
  onSubmit: (
    values: IAboutModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const About = ({ initialValues, onSubmit }: IAboutProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  console.log(initialValues)
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={AboutSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue
      }) => (
        <form onSubmit={handleSubmit} className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 items-center">
        
          <div className="w-full">

            <CustomTextField
              label={t("title (English)")}
              value={values.titleEn}
              change={handleChange}
              name="titleEn"
              hasErrorMessages={!!errors.name && !!touched.name}
              errorMessages={[t(errors.name?.toString())]}
            />
          </div>
          <div className="w-full">
            <CustomTextField
              label={t("title (Russian)")}
              value={values.titleRu}
              change={handleChange}
              name="titleRu"
            />
          </div>
          <div className="w-full">
            <CustomTextField
              label={t("title (Azerbaijani)")}
              value={values.titleAz}
              change={handleChange}
              name="titleAz"
            />
          </div>
          <div className="w-full">
            <CustomTextField
              label={t("description (English)")}
              value={values.descEn}
              change={handleChange}
              name="descEn"
            />
          </div>
          <div className="w-full">
            <CustomTextField
              label={t("description (Russian)")}
              value={values.descRu}
              change={handleChange}
              name="descRu"
            />
          </div>
          <div className="w-full">
            <CustomTextField
              label={t("description (Azerbaijani)")}
              value={values.descAz}
              change={handleChange}
              name="descAz"
            />
          </div>
          <div className="w-full">
            <label htmlFor="image">{t('Image')}</label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={(event) => {
                const file = event.currentTarget.files[0];
             
                setFieldValue('image', file); // Dosyayı setFieldValue ile ekliyoruz
              }}
            />
            {/* Hata mesajı varsa göster */}
            {errors.image && touched.image && <div>{errors.image}</div>}
          </div>
        </div>
      
        <div className="w-full flex gap-x-6 justify-end mb-6">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => navigate("/admin/Abouts")}
            className="p-2 bg-gray-600 text-white rounded-md uppercase hover:bg-blue-500 tracking-widest transition shadow-lg disabled:opacity-70"
          >
            {t("goBack")}
          </button>
          <button
            type="submit"
            // disabled={isSubmitting}
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

export default About;
