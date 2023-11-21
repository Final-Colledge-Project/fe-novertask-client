export interface IGetAllByWSIdBody {
  wsId: string
  option?: {
    fields: (
      | 'createdAt'
      | 'cover'
      | 'name'
      | 'members'
      | 'createdAt'
      | 'dueDate'
    )[]
    sort: 'createdAt' | 'name' | 'createdAt'
    limit: number
    page: number
  }
}
