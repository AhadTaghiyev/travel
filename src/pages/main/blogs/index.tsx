import Navbar from "@/components/layout/navbar";
import { cn, formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";
import BlankImage from "@/assets/blank-image.png";
import { apiService } from "@/server/apiServer";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import Loading from "@/components/custom/loading";
import { capitalize } from "lodash";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const getData = (page = 1) => {
    apiService.get(`/Blog/GetAll/${page}`).then((res) => {
      if (res.status !== 200) {
        toast.error(t("Something went wrong"));
        return;
      }
      const { items } = res.data;
      setBlogs(items);
      setLoading(false);
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
          className={cn("xl:flex landing-container text-[#1C2940]")}
        >
          <div className="flex flex-col gap-y-3 xl:w-[280px] py-8 overflow-y-auto pr-[26px] xl:border-r border-solid border-[rgba(28,41,64,0.06)] xl:min-h-[calc(100vh-75px)]">
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
          <div className="xl:w-[calc(100%-280px)] py-8 px-6">
            <div className="flex justify-between">
              <h1 className="text-4xl font-bold">Blogs</h1>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-8">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex flex-col border border-solid border-[#EBEDF0] rounded-lg"
                >
                  <img
                    src={blog.image ?? BlankImage}
                    className="rounded-t-lg aspect-[4/3] object-cover"
                  />
                  <div className="flex flex-col gap-y-3 px-6 pb-6 pt-4">
                    <p className="text-xs text-[#B6C0D0]">
                      {formatDate(blog.createdAt)}
                    </p>
                    <h2 className="text-2xl">
                      {blog[`title${capitalize(language)}`]}
                    </h2>
                    <p className="line-clamp-3">
                      {blog[`miniDesc${capitalize(language)}`]}
                    </p>
                    <Link
                      to={`/blogs/${
                        blog[`link${language[0].toUpperCase() + language[1]}`]
                      }/${language}`}
                      className="cursor-pointer text-xs w-fit mt-3 px-4 py-2 border border-solid border-[#1C2940] rounded-sm hover:bg-black/5 duration-100"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
