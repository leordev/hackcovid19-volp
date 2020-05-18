export interface AuthUser {
  ownsInstitutionId: number;
  token: string;
  user: User;
}

export interface User {
  birthdate: string;
  created_at: string;
  email: string;
  id: number;
  is_helper: boolean;
  name: string;
  profile_picture: string;
  unique_document: string;
  udpdated_at: string;
}
