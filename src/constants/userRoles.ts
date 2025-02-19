export const USER_ROLES = {
  ADMIN: 1,
  STAFF: 2,
  GUEST: 3,
  CUSTOMER: 4,
  COMPANY: 5,
} as const;

export type UserRole = keyof typeof USER_ROLES;
