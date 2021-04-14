export class User {
  constructor(
    public readonly username: string,
    public readonly role: string,
    public readonly token: string
  ) {}
}
