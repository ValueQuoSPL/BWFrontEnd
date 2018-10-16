export class Utility {
  userid;
  electricity;
  gas;
  water;
  telephone;
  mobile;
  internet;
  tv;
  vcd;
  news;
  dynamicUtility: any = [];
}
export class Travel {
  userid;
  food;
  entertainment;
  dineout;
  vacation;
  hobby;
  dynamicTravel: any = [];
}
export class Credit {
  userid;
  issuer;
  limit;
  monthly_usage;
  monthly_pay;
  type;
  roi;
  balance;
  bank;
  id;
  creditModelArray: any = [];
}
export class Life {
  id;
  userid;
  type;
  ins_name;
  policy_name;
  premium;
  policy_term;
  issuer;
  start_date;
  proposer_name;
  sum;
  premium_term;
  premium_mode;
  lifeModelArray: any = [];

  constructor() {}
}
export class General {
  id;
  userid;
  ins_obj;
  policy_name;
  premium;
  policy_term;
  issuer;
  start_date;
  sum;
  policy_no;
  proposer_name;
  premium_mode: any;
  generalModelArray: any = [];
}
export class Health {
  id;
  userid;
  ins_name;
  policy_name;
  premium;
  policy_term;
  issuer;
  start_date;
  sum;
  policy_no;
  proposer_name;
  premium_mode;
  healthModelArray: any = [];
}
export class House {
  userid;
  milk;
  fruit;
  rent;
  fuel;
  medical;
  society;
  auto;
  edu;
  grocery;
  servent;
  laundry;
  vcd;
  selfcare;
  property;
  dynamicHousehold: any = [];
}
export class Income {
  userid;
  incomeSalary: number;
  incomeAward: number;
  incomeBonus: number;
  incomePension: number;
  incomeSaving: number;
  incomeDeposit: number;
  incomeRental: number;
  dynamicIncome: any = [];
  constructor() {}
}
export class Loan {
  userid;
  loan_type;
  lender;
  applicant: '';
  amnt;
  ldate: '';
  check: boolean;
  tenure;
  intrest_type: '';
  roi;
  rdate: '';
  id;
  loanModelArray: any = [];
  constructor() {}
}
export class Misc {
  userid;
  shoes;
  pet;
  electronics;
  furniture;
  charity;
  gift;
  cloth;
  dynamicMisc: any = [];
}
