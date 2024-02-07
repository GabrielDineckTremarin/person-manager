interface IContactSocialMedia {
    mediaName: string;
    username: string;
  }
  
export interface IContact {
phones: string[];
emails: string[];
socialMedia?: IContactSocialMedia[];
}