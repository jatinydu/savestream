import { useCallback, useEffect, useState } from "react";
import type { Tag as ITag } from "../createPost/AddPostModel";

interface Tag{
  id:string,
  name:string,
  created_at:string,
  updated_at:string
}

export default function Suggestions({tagsSuggestions,handleAddTag,alreadySelected}:{ tagsSuggestions: Tag[], handleAddTag?: (tag: ITag) => void, alreadySelected?: ITag[] }) {
  const selectSuggestion = useCallback((tag:any) => {
    console.log("tag : ",tag);
    if(handleAddTag) {
     handleAddTag(tag);
    }else{
      console.warn("handleAddTag function is not provided.");
    }
    console.log("Selected tag:", tag);
  }, [tagsSuggestions]);


  return (
    <div onClick={(e) => e.stopPropagation()} className='w-full flex flex-col gap-1 max-h-[100px] overflow-y-scroll bg-gray-200 py-1 rounded-lg custom-scrollbar'>
      {
        tagsSuggestions.map((tag) => (
          <div key={tag.id} onClick={(e)=>{ e.stopPropagation(); selectSuggestion(tag)}} className='flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-300 cursor-pointer transition-all duration-300'>
            <span id="select" className={`${alreadySelected?.map(ele=>ele.name).includes(tag.name) ? "text-primary-light" : "text-gray-700"} hover:text-gray-600`}>{tag.name}</span>
          </div>
        ))
      }
    </div>
  )
}
