// src/types.ts (or within auth.ts if you don't have a types file)
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  user_type_id: string; // ✅ Added user_type_id
}
