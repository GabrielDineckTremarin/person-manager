import { IContact } from "./IContact";
import { IAddress } from "./IAddress";

export interface IPersonResponse {
    id: string;
    name?: string;
    lastName?: string;
    fullName?: string;
    birthday: Date;
    age?: number;
    contactId?: IContact;
    addressesIds?: IAddress[];
  }