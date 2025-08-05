import { Link2, X } from "lucide-react";
import ActionBtn from "../lib/ActionBtn";
import CreateInput from "./CreateInput";
import CtaBtn from "../lib/CtaBtn";
import { useState, useRef, useEffect } from "react";
import { Dropdown } from "../lib/Input";
import debounce from "lodash/debounce";
import useToast from "../../hooks/useToast";
import { Tags_URl } from "../../Endpoints";

const categoryOptions = [
  { label: "Technology", value: "technology" },
  { label: "Health", value: "health" },
  { label: "Education", value: "education" },
  { label: "Finance", value: "finance" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Travel", value: "travel" }
]

interface Tag{
  _id: string;
  name: string;
}

export default function AddPostModel({className}: {className?: string}) {
  const { showToast } = useToast();
  const tagRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [ suggestions, setSuggestions ] = useState([]);
  const [ query, setQuery ] = useState('');
  const [ category, setCategory ] = useState("");
  const [ tags, setTags ] = useState<Tag[]>([]);

  const fetchTagSuggestions = async(query: string) => {
    if (!query.trim() || query.trim().length<2) return;

    try {
      setLoading(true);
      const res = await fetch(`${Tags_URl}/?q=${query}`,{
        method: "GET",
        credentials:'include'
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch tags");
      }
      setSuggestions(data?.tags || []);
    } catch (err:any) {
      console.error("Error fetching tags:", err.message);
      setSuggestions([]);
      showToast({
        variant: "error",
        message: "Failed to fetch tags. Please try again later."
      })
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useRef(
    debounce((value: string) => {
      fetchTagSuggestions(value);
    }, 300)
  ).current;


  useEffect(() => {
    debouncedSearch(query);
  },[query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleAddTag = (tag: Tag) => {
    if (!tags.find((t) => t.name === tag.name)) {
      setTags((prev) => [...prev, tag]);
    }
    setQuery("");
    setSuggestions([]);
    if (tagRef.current) tagRef.current.value = "";
  };

  const handleAddNewTag = () => {
    if (query && !tags.find((t) => t.name === query)) {
      const _id = Math.random().toString(36).substring(2, 15); 
      handleAddTag({ name: query, _id:_id });
    }
  };

  const handleRemoveTag = (name: string) => {
    setTags((prev) => prev.filter((t) => t.name !== name));
  };

  const keyEnterHandler=(e:any)=>{
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddNewTag();
    }
  }

  return (
    <div className={`min-w-1/3 h-auto flex flex-col gap-1 p-5 bg-white rounded-2xl ${className}`}>
      <ul className="flex justify-between items-center">
        <li className="flex gap-2 items-center">
         <span className="text-primary"><Link2 size={22}/></span>
         <span className="font-serif text-[1.40rem] font-normal">Save Resource</span>
        </li>
        <ActionBtn variant="ghost" icon={<X className="closeModel" size={15}/>}  size="xsmall" className="mt-3 border-none outline-none hover:bg-transparent closeModel" onClick={() => console.log("Save Resource clicked")}/>
      </ul>
      <form className="w-full h-auto py-1 flex flex-col gap-4">
          <CreateInput tagType="input" type="text" label="URL" required={true}/>
          <CreateInput tagType="input" type="text" label="Title" required={true}/>
          <CreateInput tagType="textarea" type="textarea" label="Notes" required={false} placeholder="Add personal notes or key takeways.."/>
          <Dropdown placeholder="select a category" onSelect={(op)=>{setCategory(op.value)}} options={categoryOptions}/>
          <CreateInput handleKeyDown={keyEnterHandler} onChange={handleInputChange} className="text-gray-500 text-[15px]" tagType="dropdown" label="Tags" required={true} reference={tagRef} suggestions={suggestions}/>
      </form>
      <div className="flex gap-4 mt-4">
        <CtaBtn label="Cancel" className="flex-1 flex justify-center items-center" variant="ghost" size="large" onClick={() => console.log("cancel")}/>
        <CtaBtn label="Save Resource" className="flex-1 flex justify-center items-center" variant="primary" size="large" onClick={() => console.log("save")}/>
      </div>
    </div>
  )
}
