import { useCallback, useEffect, useMemo, useState } from 'react'
import { SimpleInput } from '../lib/Input'
import Suggestions from './Suggestions';
import debounce from 'lodash/debounce';
import _ from 'lodash';

interface Tag {
  _id: string;
  name: string;
}


export default function SearchInput({suggestions, reference, placeholder, className}:{suggestions?: Tag[], reference?: React.Ref<HTMLInputElement>, placeholder?: string, className?: string}) {
  return (
    <div className='flex flex-col gap-2'>
      <SimpleInput reference={reference} placeholder={placeholder} className={`w-full rounded-xl text-gray-600 font-medium text-sm ${className}`}/>
      {
         suggestions && suggestions.length > 0 ? <Suggestions categories={suggestions}/> : null
      }
    </div>
  )
}
