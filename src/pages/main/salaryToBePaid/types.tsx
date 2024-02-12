export interface ISalaryToBePaidModel {
  employeeId: number;
  paymentId: number;
  date: Date;
  salary: number;
  extraSalary: number;
  bonus: number;
  note?: string;
}
