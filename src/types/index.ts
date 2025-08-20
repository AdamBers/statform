export interface Payment {
  id: string;
  number: string;
  createdAt: string;
  type: "electronic" | "cash";
  amount: number;
  customer: string;
  customerInn: string;
  executor: string;
  executorInn: string;
  examineeName: string;
  paymentComment: string;
  accountantComment: string;
}

export interface Invoice {
  id: string;
  number: string;
  type: "education" | "duty";
  examineeName: string;
  qualification: string;
  amount: number;
  customer: string;
  customerInn: string;
  executor: string;
  executorInn: string;
  paymentPurpose: string;
}

export interface LinkedItem {
  id: string;
  paymentId: string;
  invoiceId: string;
  payment: Payment;
  invoice: Invoice;
  linkedAt: string;
}

export interface FilterState {
  paymentNumber: string;
  invoiceNumber: string;
  customer: string;
  customerInn: string;
  executor: string;
  executorInn: string;
  examineeName: string;
  amountFrom: number | "";
  amountTo: number | "";
  dateFrom: string;
  dateTo: string;
}
