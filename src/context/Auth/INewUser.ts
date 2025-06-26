export default interface INewUser {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  accountType: "buyer" | "seller";
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  companyName?: string;
  orgNr?: string;
  invoiceAddress?: string;
}