'use client';
import CustomButtons from "../forms/CustomButtons";
import { ConversationType } from "@/app/inbox/page";
interface ConversationDetailProps{
  conversation: ConversationType;
  userId:string;
}
const ConversationDetail:React.FC<ConversationDetailProps> = ({conversation,userId}) => {
  const myUser = conversation.users.find((user) => user.id == userId)
  const otherUser = conversation.users.find((user) => user.id != userId)
  return (
    <>
      <div className="max-h-[400px] overflow-auto flex flex-col space-y-4">
        <div className="w-[80%] py-4 px-6 rounded-xl bg-gray-200">
          <p className="font-bold text-gray-500">John Doe</p>
          <p>adfafwfwfsddfaf</p>
        </div>

        <div className="w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200">
          <p className="font-bold text-gray-500">Me</p>
          <p>adfafwfwfsddfaf adsdasd</p>
        </div>
      </div>
      <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
        <input
          type="text"
          placeholder="Type your messsage..."
          className="w-full p-2 bg-gray-200 rounded-xl"
        />
        <CustomButtons 
        onClick={()=>{console.log("Clicked")}}
        label="Send"
        className="w-[100px]" />
      </div>
    </>
  );
};
export default ConversationDetail;
