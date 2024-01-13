import { Dialog, DialogContent } from "@mui/material";
import { ReactNode, FC } from "react";

type Props = {
  children: ReactNode;
  open: boolean;
  setOpen: (state: boolean) => void;
};

export const CustomModal: FC<Props> = ({ children, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={false}>
      <DialogContent sx={{ minWidth: "600px" }}>{children}</DialogContent>
    </Dialog>
  );
};
