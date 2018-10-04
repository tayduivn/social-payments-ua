export interface PersonAddress {
  street: {
    _id: string;
    name: string;
  };
  house: string;
  houseSection?: string;
  apartment?: string;
}
