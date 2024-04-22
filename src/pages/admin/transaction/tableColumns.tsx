import { cn, formatDate } from "@/lib/utils";
import { apiService } from "@/server/apiServer";
import { Menu, Transition } from "@headlessui/react";
import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";
import { Fragment } from "react";
import { toast } from "sonner";

export const columns: (t: TFunction) => GridColDef[] = () => [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "id",
    headerName: "Id",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "company",
    headerName: "Company",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    headerClassName: "header-item",
  },

  {
    field: "status",
    headerName: "Payment Status",
    flex: 1,
    headerClassName: "header-item",

    renderCell: (params) => {
      const id = params.row.id;
      const onTypeChange = async () => {
        const promise = apiService
          .patch(`/Company/ChangeTransactionStatus`, id)
          .then(() => {
            window.location.reload();
          });
        toast.promise(promise, {
          loading: "Changing...",
          success: "Changed",
          error: "Failed",
        });
      };

      return (
        <Menu as="div" className="relative inline-block text-left ">
          <div>
            <Menu.Button
              className={cn(
                "flex border-none items-center gap-x-4 font-semibold",
                params.value ? "text-green-500" : "text-red-500"
              )}
            >
              {params.value ? "Paid" : "Not Paid"}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="z-[9999] absolute left-0 mt-2 w-[100px] origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 rounded-sm">
                <Menu.Item>
                  {() => (
                    <button
                      onClick={onTypeChange}
                      className="border-none group gap-x-2 flex w-full items-center rounded-sm p-1 text-sm font-semibold hover:bg-blue-200 hover:text-black"
                    >
                      {!params.value ? "Paid" : "Not Paid"}
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Date",
    flex: 1,
    headerClassName: "header-item",
    renderCell: (params) => <>{formatDate(params.value)}</>,
  },
];
