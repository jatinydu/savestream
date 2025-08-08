import { Link2, X } from "lucide-react";
import ActionBtn from "../lib/ActionBtn";
import CreateInput from "./CreateInput";
import CtaBtn from "../lib/CtaBtn";
import { useState, useRef, useEffect } from "react";
import { Dropdown } from "../lib/Input";
import debounce from "lodash/debounce";
import useToast from "../../hooks/useToast";
import { BASE_URL, Tags_URl } from "../../Endpoints";
import { useUID } from 'react-uid';
import { usePost } from "../../hooks/usePost";

const categoryOptions = [
  { label: "Technology", value: "technology" },
  { label: "Health", value: "health" },
  { label: "Education", value: "education" },
  { label: "Finance", value: "finance" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Travel", value: "travel" }
]

export interface Tag{
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
  const [ alreadySelected, setAlreadySelected ] = useState<Tag[]>([]);
  const uid = useUID();
  const urlRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const { setPosts } = usePost();

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
    console.log('Adding tag:', tag);
    if (!tags.find((t) => t.name === tag.name)) {
      setTags((prev) => [...prev, tag]);
        setAlreadySelected((prev:any) => [...prev, tag]);
    }
    setQuery("");
    setSuggestions([]);
    if (tagRef.current) tagRef.current.value = "";
    console.log(" tags object > ", tags);
  };

  const handleAddNewTag = () => {
    if (query && !tags.find((t) => t.name === query)) {
      handleAddTag({ name: query, _id:uid });
    }
  };

  const handleRemoveTag = (name: string) => {
    setTags((prev) => prev.filter((t) => t.name !== name));
  };

  const keyEnterHandler=(e:any)=>{
    console.log("Key pressed:", e.key);
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddNewTag();
    }
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const data ={
      title: titleRef.current?.value,
      link: urlRef.current?.value,
      desc: notesRef.current?.value,
      type: category,
      tags: tags.map(tag => tag.name)
    }

    console.log("Data to be submitted:", data);

    if (!data.title || !data.link || !data.type) {
      showToast({
        variant: "error",
        message: "Please fill all required fields."
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const response = await res.json();
      if (!res.ok) {
        throw new Error(response.message || "Failed to save resource");
      }

      console.log(response.post);
      setPosts((prev:any)=>([
        ...prev,
        {
          id: response.post.id,
          title: response.post.title,
          desc: response.post.desc || "",
          link: response.post.link,
          user_id: response.post.user_id,
          created_at: response.post.created_at,
          updated_at: response.post.updated_at,
        }
      ]));

      showToast({
        variant: "success",
        message: "Resource saved successfully!"
      });
      // Reset form fields
      setCategory("");
      setTags([]);
      if (urlRef.current) urlRef.current.value = "";
      if (titleRef.current) titleRef.current.value = "";
      if (notesRef.current) notesRef.current.value = "";
    } catch (err:any) {
      console.error("Error saving resource:", err.message);
      showToast({
        variant: "error",
        message: err.message || "Failed to save resource. Please try again."
      });
    } finally {
      setLoading(false);
    }
  }

  const categoryHandler=(op:any)=>{
    setCategory(op.value)
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
          <CreateInput reference={urlRef} tagType="input" type="text" label="URL" required={true}/>
          <CreateInput reference={titleRef} tagType="input" type="text" label="Title" required={true}/>
          <CreateInput reference={notesRef} tagType="textarea" type="textarea" label="Notes" required={false} placeholder="Add personal notes or key takeways.."/>
          <Dropdown placeholder="select a category" onSelect={categoryHandler} options={categoryOptions}/>
          <CreateInput alreadySelected={alreadySelected} handleAddTag={handleAddTag} handleKeyDown={keyEnterHandler} onChange={handleInputChange} className="text-gray-500 text-[15px]" tagType="dropdown" label="Tags" required={true} reference={tagRef} suggestions={suggestions}/>
          {
            tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span key={tag._id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center gap-2">
                    {tag.name}
                    <button type="button" onClick={() => handleRemoveTag(tag.name)} className="text-red-500 hover:text-red-700 cursor-pointer">&times;</button>
                  </span>
                ))}
              </div>
            )
          }
      </form>
      <div className="flex gap-4 mt-4">
        <CtaBtn label="Cancel" className="flex-1 flex justify-center items-center" variant="ghost" size="large"/>
        <CtaBtn label="Save Resource" className="flex-1 flex justify-center items-center" variant="primary" size="large" onClick={submitHandler}/>
      </div>
    </div>
  )
}
