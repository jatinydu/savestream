import CtaBtn from '../lib/CtaBtn';
import { SimpleInput } from '../lib/Input';
import { Filter } from 'lucide-react';

export default function FeedHeader() {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
         <SimpleInput placeholder='Search resources...' size='sm'/>
         <CtaBtn variant="ghost" startIcon={<Filter color='black' size={15}/>} label="Filters" className='mt-1' onClick={()=>{}}/>
      </div>
    </div>
  )
}
