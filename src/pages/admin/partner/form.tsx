// @ts-nocheck
import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { PartnerSchema } from "./schema";
import { IPartnerModel } from "./types";

import CustomTextField from "@/components/custom/input";

type FormType = "Edit" | "Create" | "View";

interface IPartnerProps {
  formType: FormType;
  initialValues: IPartnerModel;
  onSubmit: (
    values: IPartnerModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const Partner = ({ initialValues, onSubmit }: IPartnerProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  console.log(initialValues)
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={PartnerSchema}
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
            onClick={() => navigate("/admin/Partners")}
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

export default Partner;
