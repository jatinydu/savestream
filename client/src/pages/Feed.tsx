import Card from "../components/Common/Card";
import FeedHeader from "../components/Feed/FeedHeader";

export default function Feed() {
  return (
    <div className='w-full min-h-[100vh] pt-[7%] px-10'>
      <FeedHeader />
      {/* Card container */}
      <div className="py-5 h-auto flex flex-wrap gap-3">
        <Card/>
      </div>
    </div>
  )
}
