export interface ContactType {
  id: string;
  name: string;
  email: string;
  phone: string;
}
export interface ItemDetailsType {
  about: string;
  rules: string;
  format: string;
  contact: ContactType[];
  isClosed: boolean;
  fee: number;
  venue: string;
}
