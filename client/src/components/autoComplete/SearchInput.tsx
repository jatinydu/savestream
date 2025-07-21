import { useEffect, useState } from 'react'
import { SimpleInput } from '../lib/Input'
import Suggestions from './Suggestions';

export default function SearchInput() {
  const [categories, setCategories] = useState([]);
  useEffect(()=>{
    const fetchCategories = async () => {
      try{
        const data = await fetch('https://dummyjson.com/products');
        const res = await data.json();
        console.log(res);
        if(res && res.products) {
          setCategories(res.products);
        }
      }catch(error){
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  },[])
  return (
    <div className='flex flex-col gap-2'>
      <SimpleInput className='w-full rounded-xl'/>
      {
         categories && categories.length > 0 ? <Suggestions categories={categories}/> : null
      }
    </div>
  )
}
