export type Profile = {
  id: string;
  email: string;
  firstMidName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  createAt: string;
};

export type Record = {
  id: string;
  code: string;
  firstMidName: string;
  image: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: boolean;
  position: string;
  degree: string;
  salaryScale: number;
  benefitSalary: number;
  baseSalary: number;
  createAt: string;
  updateAt: string;
  departments: Department[];
  salaries: Salary[];
};

export type Department = {
  id: string;
  name: string;
  createAt: string;
  updateAt: string;
};

export type Salary = {
  id: string;
};

export * from ".";
