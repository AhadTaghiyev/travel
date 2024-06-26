import * as Yup from "yup";

export const BlogSchema = Yup.object().shape({
  titleEn: Yup.string().required("Başlıq (İngiliscə) daxil edilməlidir"),
  titleRu: Yup.string().required("Заголовок (на русском) должен быть введен"),
  titleAz: Yup.string().required("Başlıq (Azərbaycanca) daxil edilməlidir"),
  linkEn: Yup.string().required("Link (İngiliscə) daxil edilməlidir"),
  linkRu: Yup.string().required("Link (на русском) должен быть введен"),
  linkAz: Yup.string().required("Link (Azərbaycanca) daxil edilməlidir"),
  descEn: Yup.string().required("Açıqlama (İngiliscə) daxil edilməlidir"),
  descRu: Yup.string().required("Описание (на русском) должно быть введено"),
  descAz: Yup.string().required("Açıqlama (Azərbaycanca) daxil edilməlidir"),
  miniDescEn: Yup.string().required("Açıqlama (İngiliscə) daxil edilməlidir"),
  miniDescRu: Yup.string().required(
    "Описание (на русском) должно быть введено"
  ),
  miniDescAz: Yup.string().required(
    "Açıqlama (Azərbaycanca) daxil edilməlidir"
  ),
});
