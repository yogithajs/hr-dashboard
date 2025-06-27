export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  department: string;
  performance: number;
  bio: string;
  pastPerformance: number[];
  address: {
    address: string;
    city: string;
    [key: string]: any;
  };
}
