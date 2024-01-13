import { Fragment } from "react";
import { FieldArray, Formik, Form } from "formik";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { IInvoiceModel, IPlaneTicketModel, IInvoiceDirections } from "../types";

import { useTranslation } from "react-i18next";
import CustomAutocomplete from "../../../../components/custom/customAutocomplete";
import CustomTextField from "../../../../components/custom/customTextField";
import CustomDateTimePicker from "../../../../components/custom/customDateTimePicker";

const textStyling = {
  lineHeight: "16px",
  fontWeight: "400",
  fontSize: "12px",
};
const footer = {
  borderRadius: "2px",
  background: "#F8F9FB",
  display: "flex",
  justifyContent: "end",
  padding: "12px 60px",
};

const invoiceDirection = {
  flightDate: Date(),
  direction: "",
};

const planeTicket = {
  ticketNo: "",
  passengerName: "",
  segmentCount: 0,
  purchasePrice: 0,
  sellingPrice: 0,
  discount: 0,
  commonPrice: 0,
  explanation: "",
  supplierId: 0,
  personalId: 0,
  airWayId: 0,
  referanceNo: 0,
  invoiceDirections: [invoiceDirection],
};

const initialValue = {
  date: Date(),
  deadLine: Date(),
  customerId: 0,
  isCustomerPaid: false,
  isSupplierPaid: false,
  paidAmount: 0,
  paymentId: 0,
  planeTickets: [planeTicket],
};

export default function Index() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Formik
        initialValues={initialValue}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          // values.tickets.map(
          //   (item) => (
          //     (item.isSupplierPaid = isSupplierPaid),
          //     (item.personalId = item.personalId.value),
          //     (item.supplierId = item.supplierId.value),
          //     (item.customerId = item.customerId.value),
          //     (item.airWayId = item.airWayId.value)
          //   )
          // );
          // try {
          //   const res = await apiService.post(
          //     `/PlaneTickets/Create`,
          //     values.tickets
          //   );
          //   if (res?.status == 200) {
          //     toast.success('Uğurla yaradıldı!');
          //     if (Array.isArray(res?.data.data) && res.data.data.length > 0) {
          //       const guids = res?.data.data.join(',');
          //       navigate({
          //         pathname: `/panel/aviabiletsale/report`,
          //         search: `?tickets=${guids}`,
          //       });
          //     }
          //   } else {
          //     setErrors({ tickets: res.data.errors });
          //   }
          // } catch (err) {
          //   console.error(err);
          // }
        }}
        render={(props) => (
          <Form style={{ backgroundColor: "white", padding: "10px" }}>
            <FieldArray
              name="planeTickets"
              render={(arrayHelpers) => (
                <div>
                  {props.values.planeTickets?.map((ticket, index) => (
                    <Container maxWidth="xl" key={index}>
                      {index === 0 ? (
                        <Button
                          variant="contained"
                          sx={{
                            mb: 3,
                            mr: 3,
                            display: index === 0 ? "initial" : "none",
                          }}
                          style={textStyling}
                          onClick={() => {
                            arrayHelpers.push(props.values.planeTickets[index]);
                          }}
                        >
                          + {t("newPassenger")}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="error"
                          sx={{
                            mb: 3,
                            display: index === 0 ? "none" : "initial",
                          }}
                          style={textStyling}
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          - Sil
                        </Button>
                      )}
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "70px" }}
                      >
                        <Grid item md={2}>
                          <CustomAutocomplete
                            api="Personals/GetAll/1"
                            label={t("personal")}
                            initialValue={null}
                            optionLabel="fullName"
                            change={(event, value) =>
                              props.handleChange({
                                target: {
                                  name: `planeTickets[${index}].personalId`,
                                  value: value,
                                },
                              })
                            }
                            hasErrorMessages={
                              (props.errors as any).planeTickets &&
                              (props.touched as any).planeTickets &&
                              (
                                (props.touched as any).planeTickets[
                                  index
                                ] as any
                              ).personalId
                            }
                            errorMessages={[
                              props.errors?.planeTickets
                                ? (props.errors?.planeTickets[index] as any)
                                    ?.personalId
                                : "",
                            ]}
                          />
                        </Grid>
                        <Grid item md={2}>
                          <CustomAutocomplete
                            api="Suppliers/GetAll/1"
                            label={t("supplier")}
                            initialValue={null}
                            optionLabel="name"
                            change={(event, value) =>
                              props.handleChange({
                                target: {
                                  name: `planeTickets[${index}].supplierId`,
                                  value: value,
                                },
                              })
                            }
                            hasErrorMessages={
                              props.errors.planeTickets &&
                              props.touched.planeTickets &&
                              (props.touched.planeTickets[index] as any)
                                .supplierId
                            }
                            errorMessages={[
                              props.errors?.planeTickets
                                ? (props.errors.planeTickets[index] as any)
                                    ?.supplierId
                                : "",
                            ]}
                          />
                        </Grid>

                        <Grid item md={2}>
                          <CustomAutocomplete
                            api="Customers/GetAll/1"
                            label={t("customer")}
                            initialValue={null}
                            optionLabel="fullName"
                            change={(event, value) =>
                              props.handleChange({
                                target: {
                                  name: `customerId`,
                                  value: value,
                                },
                              })
                            }
                            hasErrorMessages={
                              props.errors.customerId &&
                              props.touched.customerId &&
                              (props.touched.customerId[index] as any)
                            }
                            errorMessages={[
                              props.errors?.customerId
                                ? (props.errors.customerId[index] as any)
                                    ?.customerId
                                : "",
                            ]}
                          />
                          {/* <Button
                            variant="text"
                            sx={{ mb: 1 }}
                            style={textStyling}
                            onClick={() => {
                              setOpen(true);
                              setModalOption(
                                modalOptions?.find(
                                  (x) => x.field === 'Customer'
                                )
                              );
                            }}
                          >
                            + {t('newCustomer')}
                          </Button> */}
                        </Grid>
                        <Grid item md={2}>
                          <CustomTextField
                            label={t("ticketNumber")}
                            value={props.values.planeTickets[index].ticketNo}
                            change={props.handleChange}
                            name={`planeTickets[${index}].ticketNo`}
                            hasErrorMessages={
                              props.errors.planeTickets &&
                              props.touched.planeTickets &&
                              (props.touched.planeTickets[index] as any)
                                ?.ticketNo
                            }
                            errorMessages={[
                              props.errors.planeTickets
                                ? (props.errors.planeTickets[index] as any)
                                    ?.ticketNo
                                : "",
                            ]}
                          />
                        </Grid>
                        <Grid item md={2}>
                          <CustomTextField
                            label={t("passengerName")}
                            value={
                              props.values.planeTickets[index].passengerName
                            }
                            change={props.handleChange}
                            name={`planeTickets[${index}].passengerName`}
                            hasErrorMessages={
                              props.errors.planeTickets &&
                              props.touched.planeTickets &&
                              (props.touched.planeTickets[index] as any)
                                ?.passengerName
                            }
                            errorMessages={[
                              props.errors.planeTickets
                                ? (props.errors.planeTickets[index] as any)
                                    ?.passengerName
                                : "",
                            ]}
                          />
                        </Grid>
                        <Grid item md={2}>
                          <CustomTextField
                            label={t("segmentCount")}
                            value={
                              props.values.planeTickets[index].segmentCount
                            }
                            change={props.handleChange}
                            type="number"
                            name={`planeTickets[${index}].segmentCount`}
                            hasErrorMessages={
                              props.errors.planeTickets &&
                              props.touched.planeTickets &&
                              (props.touched.planeTickets[index] as any)
                                ?.segmentCount
                            }
                            errorMessages={[
                              props.errors.planeTickets
                                ? (props.errors.planeTickets[index] as any)
                                    ?.segmentCount
                                : "",
                            ]}
                          />
                        </Grid>
                        <Grid item md={2}>
                          <CustomTextField
                            label={t("purchasePrice")}
                            value={
                              props.values.planeTickets[index].purchasePrice
                            }
                            change={props.handleChange}
                            type="number"
                            name={`planeTickets[${index}].purchasePrice`}
                            hasErrorMessages={
                              props.errors.planeTickets &&
                              props.touched.planeTickets &&
                              (props.touched.planeTickets[index] as any)
                                ?.purchasePrice
                            }
                            errorMessages={[
                              props.errors.planeTickets
                                ? (props.errors.planeTickets[index] as any)
                                    ?.purchasePrice
                                : "",
                            ]}
                          />
                        </Grid>
                        <Grid item md={2}>
                          <CustomTextField
                            label={t("salePrice")}
                            value={
                              props.values.planeTickets[index].sellingPrice
                            }
                            change={props.handleChange}
                            type="number"
                            name={`planeTickets[${index}].sellingPrice`}
                            hasErrorMessages={
                              props.errors.planeTickets &&
                              props.touched.planeTickets &&
                              (props.touched.planeTickets[index] as any)
                                ?.sellingPrice
                            }
                            errorMessages={[
                              props.errors.planeTickets
                                ? (props.errors.planeTickets[index] as any)
                                    ?.sellingPrice
                                : "",
                            ]}
                          />
                        </Grid>

                        <Grid item md={2}>
                          <CustomTextField
                            label={t("discount")}
                            value={props.values.planeTickets[index].discount}
                            change={props.handleChange}
                            type="number"
                            name={`planeTickets[${index}].discount`}
                            hasErrorMessages={
                              props.errors.planeTickets &&
                              props.touched.planeTickets &&
                              (props.touched.planeTickets[index] as any)
                                ?.discount
                            }
                            errorMessages={[
                              props.errors.planeTickets
                                ? (props.errors.planeTickets[index] as any)
                                    ?.discount
                                : "",
                            ]}
                          />
                        </Grid>
                        <Grid item md={2}>
                          <CustomTextField
                            label={t("totalSalePrice")}
                            value={
                              props.values.planeTickets[index].sellingPrice! -
                              props.values.planeTickets[index].discount!
                            }
                            change={props.handleChange}
                            type="number"
                            name={`planeTickets[${index}].discount`}
                            placeholder="Avtomatik"
                          />
                        </Grid>
                        <Grid item md={2}>
                          {props.values.planeTickets[
                            index
                          ].invoiceDirections?.map((elem, key) => (
                            <Fragment key={key}>
                              <CustomTextField
                                label={t("direction")}
                                value={
                                  props.values.planeTickets[index]
                                    .invoiceDirections[key].direction
                                }
                                change={props.handleChange}
                                type="text"
                                name={`planeTickets[${index}].invoiceDirections[${key}].direction`}
                                hasErrorMessages={
                                  props.errors.planeTickets &&
                                  props.touched.planeTickets &&
                                  (props.touched.planeTickets[index] as any)
                                    ?.invoiceDirections[key].direction
                                }
                                errorMessages={[
                                  props.errors.planeTickets
                                    ? (props.errors.planeTickets[index] as any)
                                        ?.invoiceDirections[key].direction
                                    : "",
                                ]}
                              />
                              <CustomDateTimePicker
                                label={t("flightDate")}
                                value={
                                  props.values.planeTickets[index]
                                    .invoiceDirections[key].flightDate
                                }
                                change={(newValue) => {
                                  const event = {
                                    target: {
                                      name: `planeTickets[${index}].invoiceDirections[${key}].flightDate`,
                                      value: newValue,
                                    },
                                  };
                                  props.handleChange(event);
                                }}
                                hasErrorMessages={
                                  props.errors.planeTickets &&
                                  props.touched.planeTickets &&
                                  props.touched.planeTickets[index]
                                    ?.invoiceDirections[key]?.flightDate
                                }
                                errorMessages={[
                                  props.errors.planeTickets
                                    ? (props.errors.planeTickets[index] as any)
                                        ?.invoiceDirections[key].flightDate
                                    : "",
                                ]}
                              />
                              {key !== 0 && (
                                <Button
                                  color="error"
                                  onClick={() => {
                                    props.values.planeTickets[
                                      index
                                    ]?.invoiceDirections?.splice(key, 1);
                                    arrayHelpers.replace(
                                      index,
                                      props.values.planeTickets[index]
                                    );
                                  }}
                                >
                                  - İstiqaməti sil
                                </Button>
                              )}
                            </Fragment>
                          ))}
                          <Button
                            onClick={() => {
                              props.values.planeTickets[
                                index
                              ]?.invoiceDirections?.push(invoiceDirection);
                              arrayHelpers.replace(
                                index,
                                props.values.planeTickets[index]
                              );
                            }}
                          >
                            + {t("newDirection")}
                          </Button>
                        </Grid>
                        <Grid item md={2}>
                          <CustomAutocomplete
                            api="AirWays/GetAll/1"
                            label={t("airlineName")}
                            initialValue={null}
                            optionLabel="name"
                            change={(event, value) =>
                              props.handleChange({
                                target: {
                                  name: `planeTickets[${index}].airWayId`,
                                  value: value,
                                },
                              })
                            }
                            hasErrorMessages={
                              props.errors.planeTickets &&
                              props.touched.planeTickets &&
                              (props.touched.planeTickets[index] as any)
                                .airWayId
                            }
                            errorMessages={[
                              props.errors?.planeTickets
                                ? (props.errors?.planeTickets[index] as any)
                                    ?.airWayId
                                : "",
                            ]}
                          />
                        </Grid>
                        <Grid item md={2}>
                          <CustomDateTimePicker
                            label={t("deadline")}
                            value={props.values.deadLine}
                            change={(newValue) => {
                              const event = {
                                target: {
                                  name: `deadLine`,
                                  value: newValue,
                                },
                              };
                              props.handleChange(event);
                            }}
                            hasErrorMessages={
                              props.errors &&
                              props.touched &&
                              props.touched.deadLine
                            }
                            errorMessages={[
                              props.errors.planeTickets
                                ? (props.errors as any).deadLine
                                : "",
                            ]}
                          />
                        </Grid>
                        <Grid item md={2}>
                          <CustomTextField
                            label={t("explanation")}
                            value={props.values.planeTickets[index].explanation}
                            change={props.handleChange}
                            type="text"
                            name={`planeTickets[${index}].explanation`}
                          />
                        </Grid>
                        <Grid item md={2}>
                          <CustomDateTimePicker
                            label={t("date")}
                            value={props.values.date}
                            change={(newValue) => {
                              const event = {
                                target: {
                                  name: `date`,
                                  value: newValue,
                                },
                              };
                              props.handleChange(event);
                            }}
                            hasErrorMessages={
                              props.errors &&
                              props.touched &&
                              props.touched.date
                            }
                            errorMessages={[
                              props.errors.planeTickets
                                ? (props.errors as any).date
                                : "",
                            ]}
                          />
                        </Grid>
                        <Grid item md={2}>
                          {props.values.isCustomerPaid && (
                            <>
                              <CustomTextField
                                label={"Ödənilən məbləğ"}
                                value={props.values.paidAmount}
                                change={props.handleChange}
                                type="number"
                                name={`paidAmount`}
                                hasErrorMessages={
                                  props.errors &&
                                  props.touched &&
                                  (props.touched as any).paidAmount
                                }
                                errorMessages={[
                                  props.errors
                                    ? (props.errors as any).paidAmount
                                    : "",
                                ]}
                              />

                              <CustomTextField
                                label={"Qalıq məbləğ"}
                                value={
                                  props.values.planeTickets[index]
                                    .commonPrice! - props.values.paidAmount!
                                }
                                change={props.handleChange}
                                type="number"
                                name={``}
                              />

                              <CustomAutocomplete
                                api="Payments/GetAll/1"
                                label={"Ödəniş növü"}
                                initialValue={null}
                                optionLabel="type"
                                change={(event, value) =>
                                  props.handleChange({
                                    target: {
                                      name: `paymentId`,
                                      value: value,
                                    },
                                  })
                                }
                                hasErrorMessages={
                                  props.errors &&
                                  props.touched &&
                                  (props.touched as any).paymentId
                                }
                                errorMessages={[
                                  props.errors
                                    ? (props.errors as any).paymentId
                                    : "",
                                ]}
                              />
                            </>
                          )}
                        </Grid>
                      </Grid>
                    </Container>
                  ))}
                </div>
              )}
            />
            <footer style={footer}>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="isCustomerPaid"
                      checked={props.values.isCustomerPaid}
                      onChange={props.handleChange}
                    />
                  }
                  label={t("customerPayment")}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="isSupplierPaid"
                      checked={props.values.isSupplierPaid}
                      onChange={props.handleChange}
                    />
                  }
                  label={t("supplierPayment")}
                />
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ mr: 2 }}
                  onClick={() => navigate(-1)}
                >
                  {t("goBack")}
                </Button>
                <Button variant="contained" type="submit">
                  {t("confirm")}
                </Button>
              </div>
            </footer>
          </Form>
        )}
      />
      {/* {modalOption && (
        <CustomModal open={open} setOpen={setOpen}>
          {' '}
          <modalOption.component />{' '}
        </CustomModal>
      )} */}
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </>
  );
}
