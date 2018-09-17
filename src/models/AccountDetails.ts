import { IAccount } from "./Account";
import { ILicense } from "./License";

export interface IAccountDetails {
    account: IAccount;
    licenses: ILicense[];
}