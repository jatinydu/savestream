import { useCallback, useEffect, useMemo, useState } from 'react'
import { SimpleInput } from '../lib/Input'
import Suggestions from './Suggestions';
import debounce from 'lodash/debounce';
import _ from 'lodash';
import type { Tag as ITag } from "../createPost/AddPostModel"

interface Tag {
  id: string;
  name: string;
  created_at:string;
  updated_at:string;
}


export default function SearchInput({suggestions, handleAddTag, reference,handleKeyDown, placeholder, className, onChange, alreadySelected}:{suggestions?: Tag[], reference?: React.Ref<HTMLInputElement>, placeholder?: string, className?: string, onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void, handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void, handleAddTag?:(tag:ITag)=>void, alreadySelected?: ITag[]}) {
  console.log("Suggestions in SearchInput:", suggestions);
  return (
    <div className='flex flex-col gap-2'>
      <SimpleInput handleKeyDown={handleKeyDown} onChange={onChange} reference={reference} placeholder={placeholder} className={`w-full rounded-xl text-gray-600 font-medium text-sm ${className}`}/>
      {
         suggestions && suggestions.length > 0 ? <Suggestions handleAddTag={handleAddTag} tagsSuggestions={suggestions} alreadySelected={alreadySelected}/> : null
      }
    </div>
  )
}
