// import Container from "@mui/material/Container";
// import { useEffect, useState } from "react";
// import { apiService } from "../../../../server/apiServer";
// import { Button, Grid } from "@mui/material";
// import img from "@/assets/abc_home-1.jpg";
// import { FiDownload } from "react-icons/fi";
// import { useTranslation } from "react-i18next";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Loading from "@/components/custom/loading";

export default function Index() {
  // const [data, setData] = useState<any>({});
  // const [payments, setPayments] = useState<any>([]);
  // const [loading, setLoading] = useState(true);
  // const { t } = useTranslation();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // const totalReceiveAblePayableResultPromise = apiService.get(
  //     //   "/Reports/TotalReciveAblePayable"
  //     // );
  //     const financalStatusReportResultPromise = apiService.get(
  //       "/Reports/Profit"
  //     );
  //     const [totalReceiveAblePayableResult] =
  //       await Promise.all([
  //         // totalReceiveAblePayableResultPromise,
  //         financalStatusReportResultPromise,
  //       ]);
  //     // setData(totalReceiveAblePayableResult.data);
  //     setPayments(financalStatusReportResultPromise.data);
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

  // if (loading) {
  //   return <Loading />;
  // }
  // let totalAmount =
  //   payments.items?.reduce((acc, item) => acc + item.amount, 0) || 0;
  // totalAmount += data.willBeGet;
  // totalAmount -= data.willBePaids;

  return (
    <></>
    // <Container maxWidth="xl">
    //   <Container maxWidth="xl" sx={{ backgroundColor: "white", pb: 4 }}>
    //     <Grid container spacing={3} sx={{ mb: 2, width: "100%", pt: 2 }}>
    //       <Grid
    //         container
    //         sx={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Grid item xs={3}>
    //           <img src={img} style={{ width: "100%" }} />
    //         </Grid>
    //         <Grid item xs={5}>
    //           <Grid
    //             item
    //             xs={12}
    //             sx={{ display: "flex", justifyContent: "end" }}
    //             className="removeFromPrint"
    //           >
    //             <Button
    //               onClick={window.print}
    //               variant="text"
    //               color="inherit"
    //               sx={{ ml: 2, fontSize: "12px", lineHeight: "16px" }}
    //             >
    //               <FiDownload style={{ marginRight: "8px" }} /> {t("Print")}
    //             </Button>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //     <Container maxWidth="xl" style={{ paddingRight: 0, marginTop: 30 }}>
    //       <Grid
    //         sx={{
    //           width: "100%",
    //         }}
    //         container
    //       >
    //         <Table className="border border-solid border-gray-300">
    //           <TableHeader className="border-b border-solid border-black/60">
    //             <TableRow className="w-full">
    //               {/* {columns.map((column) => (
    //                 <TableHead key={column.name}>{t(column.label)}</TableHead>
    //               ))} */}
    //               <TableHead key={"payment-type"}>{t("Ödəniş növü")}</TableHead>
    //               <TableHead key={"amount"}>{t("Məbləğ")}</TableHead>
    //               <TableHead></TableHead>
    //             </TableRow>
    //           </TableHeader>
    //           <TableBody>
    //             {payments &&
    //               payments.items.map((row) => (
    //                 <TableRow key={row.id}>
    //                   <TableCell>{row.name}</TableCell>
    //                   <TableCell>{row.amount}</TableCell>
    //                   <TableCell></TableCell>
    //                 </TableRow>
    //               ))}
    //           </TableBody>
    //           <TableFooter className="w-full">
    //             <TableRow className="w-full">
    //               <TableCell className="py-2" colSpan={1}>
    //                 {t("Reciveables")}
    //               </TableCell>
    //               <TableCell className="py-2" colSpan={2}>
    //                 {data.willBeGet}
    //               </TableCell>
    //             </TableRow>
    //             <TableRow className="w-full">
    //               <TableCell className="py-2" colSpan={1}>
    //                 {t("Payables")}
    //               </TableCell>
    //               <TableCell className="py-2" colSpan={2}>
    //                 {data.willBePaids}
    //               </TableCell>
    //             </TableRow>
    //             <TableRow>
    //               <TableCell className="py-2" colSpan={1}>
    //                 {t("Current Financal Status")}
    //               </TableCell>

    //               <TableCell className="py-2" colSpan={2}>
    //                 {totalAmount}
    //               </TableCell>
    //             </TableRow>
    //           </TableFooter>
    //         </Table>
    //       </Grid>
    //     </Container>
    //   </Container>
    // </Container>
  );
}
