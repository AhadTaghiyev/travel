import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  const { t } = useTranslation();
  return (
    <div className="sweet-loading flex flex-col items-center justify-center mt-40  animate-pulse">
      <ClipLoader size={50} aria-label="Loading Spinner" data-testid="loader" />
      <span className="mt-2 tracking-widest">{t("Loading...")}</span>
    </div>
  );
};

export default Loading;
