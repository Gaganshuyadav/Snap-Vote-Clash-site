
type ClashItemType = {
    id:string,
    clash_id: string,
    image:string
    count:number
    created_at: Date,
    updated_at: Date
}


type CommentType = {
    id:string,
    clash_id: string,
    content:string,
    created_at: Date,
    updated_at: Date
}

type ClashFetchType = {
  id:string,
  title:string,
  description:string,
  clashItems: Array<ClashItemType>,
  comments: Array<CommentType>
}



export type { ClashItemType, CommentType, ClashFetchType};

