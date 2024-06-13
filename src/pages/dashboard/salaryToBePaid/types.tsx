export interface ISalaryToBePaidModel {
  personalId: number;
  paymentId: number;
  date: Date;
  salary: number;
  extraSalary: number;
  bonus: number;
  note?: string;
}
