import Navbar from "@/components/layout/navbar";
import { cn, formatDate } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import BlankImage from "@/assets/blank-image.png";
import { apiService } from "@/server/apiServer";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import Loading from "@/components/custom/loading";
import { capitalize } from "lodash";

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const getData = () => {
    apiService.get(`/Blog/Get/${id}`).then((res) => {
      if (res.status !== 200) {
        toast.error(t("Something went wrong"));
        navigate("/blogs");
        return;
      }
      setLoading(false);
      setBlog(res.data ?? {});
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-[#F8F9FB] min-h-screen">
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            fontFamily: "Fira Sans",
          }}
          className={cn("flex landing-container text-[#1C2940]")}
        >
          <div className="flex flex-col gap-y-3 w-[280px] py-8 overflow-y-auto pr-[26px] border-r border-solid border-[rgba(28,41,64,0.06)] min-h-[calc(100vh-75px)]">
            <div className="w-full border-[#EBEDF0] border p-4 border-solid ">
              <h3 className="font-bold mb-4">Latest Posts</h3>
              <div className="flex flex-col gap-y-3 text-xs ">
                <Link to="#">Why is flight compensation needed?</Link>
                <Link to="#">Why is flight compensation needed?</Link>
              </div>
            </div>
            <div className="w-full border-[#EBEDF0] border p-4 border-solid ">
              <h3 className="font-bold mb-4">Archives</h3>
              <div className="flex flex-col gap-y-3 text-xs ">
                <Link to="#">Febuary 2024</Link>
              </div>
            </div>
            <div className="w-full border-[#EBEDF0] border p-4 border-solid ">
              <h3 className="font-bold mb-4">Categories</h3>
              <div className="flex flex-col gap-y-3 text-xs ">
                <Link to="#">Travel</Link>
              </div>
            </div>
          </div>
          <div className="w-[calc(100%-280px)] py-8 px-6">
            <h1 className="text-4xl font-bold">
              {blog[`title${capitalize(language)}`]}
            </h1>
            <p className="mt-6 text-sm">
              {blog[`desc${capitalize(language)}`]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
