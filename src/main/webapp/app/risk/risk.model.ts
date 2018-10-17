export class LifeInsurance {
  public id?: number;
  public risk_coverage?: string;
  public expense_cover?: string;
  public total_yearly_expenses?: number;
  public total?: number;
  public userid?: number;
}
export class MedicalInsurance {
  public hosp_type: string;
  public room_type: string;
  public family_members: string;
  public userid: string;
  public id: number;
}
export class Questionnaire {
  investment_type: any;
  public id: number;
  public organisation_name: string;
  public investor_name: string;
  public dividend_type: string;
  public amount_invested: number;
  public rate_of_interest: number;
  public tenure: number;
  public start_date: string;
  public end_date: string;
  public fund_value: number;
  public as_of_date: string;
  public notes: string;
}
