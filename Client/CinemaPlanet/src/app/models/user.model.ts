export const enum AuthRole {
  Admin = 'Admin',
  User = 'User',
}

export class User {
  constructor(
    public readonly username: string,
    public readonly role: AuthRole,
    public readonly token: string
  ) {}
}
