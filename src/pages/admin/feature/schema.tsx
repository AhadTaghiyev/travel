import * as Yup from "yup";

export const FeatureSchema = Yup.object().shape({
  titleEn: Yup.string().required("Başlıq (İngiliscə) daxil edilməlidir"),
  titleRu: Yup.string().required("Заголовок (на русском) должен быть введен"),
  titleAz: Yup.string().required("Başlıq (Azərbaycanca) daxil edilməlidir"),
  descEn: Yup.string().required("Açıqlama (İngiliscə) daxil edilməlidir"),
  descRu: Yup.string().required("Описание (на русском) должно быть введено"),
  descAz: Yup.string().required("Açıqlama (Azərbaycanca) daxil edilməlidir"),
});