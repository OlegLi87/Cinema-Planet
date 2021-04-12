export class User {
  constructor(
    public readonly userName: string,
    public readonly role: string,
    public readonly token: string
  ) {}
}
