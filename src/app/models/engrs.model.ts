export interface Engrs {
  isSelected: boolean;
  isEdit: boolean;
  success?: number,
  id: number,
  hrms_id?: number,
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  engineer_name?: string,
  entry_designation_id?: number,
  entry_designation?: string,
  employee_caste_id?: number,
  caste_alias?: string,
  caste_name?: string,
  engineer_dob?: Date,
  engineer_dor?: Date,
  doj?: Date,
  remarks?: string,
  created_at?: Date,
  updated_at?: Date,
}

export const EngineerTable = {
  isSelected: "isSelected",
  isEdit: "isEdit",
  select: "text",
  engineer_name: 'text',
  caste_alias: "text",
  Designation: "entry_designation",
  'Birth Date': "engineer_dob",
  doj: "text",
  engineer_dor: "text",
  remarks: "text",
  hrms: "text",
  id: "text",
}
