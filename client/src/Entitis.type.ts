

export interface Company {
  id: number |undefined;
  name: string;
  email: string;
  password: string;
  coupons: Coupon[];
}

export interface Coupon {
  id: number | undefined;
  category: Category | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  amount: number;
  price: number | undefined;
  image: string | undefined;
}

export enum Category {
  FOOD = "FOOD",
  ELECTRICITY = "ELECTRICITY",
  RESTAURANT = "RESTAURANT",
  VACATION = "VACATION",
}

export interface Customer {
  id: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string;
  password: string;
  coupons: Coupon[];
}
export enum UserType {
  ADMINISTRATOR = "ADMINISTRATOR",
  ELECTRICITY = "COMPANY",
  RESTAURANT = "CUSTOMER",
}
