export class BoardModel /*implements BoardInterface*/ {
  constructor(
    private body: string,
    private user_id: string,
    private image?: File,
    private like_user_ids?: string[]
  ) {}
}