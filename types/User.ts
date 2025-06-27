export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  phone: string;
  performance: number;
  address: {
    address: string;
    city: string;
  };
  bio: string;
  pastPerformance: number[];
}