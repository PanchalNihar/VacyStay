'use client';
import usePropertyModal from "@/app/hooks/usePropertyModal";
import useLoginModal from "@/app/hooks/useLoginModal";

interface AddPropertyButtonProp {
  userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProp> = ({
  userId
}) => {
  const loginModal = useLoginModal();
  const addPropertyModal = usePropertyModal();

  const YourHome = () => {
    if (userId) {
      addPropertyModal.open();
    } else {
      loginModal.open();
    }
  };

  return (
    <div
      onClick={YourHome}
      className="p-3 px-6 text-sm font-semibold text-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:scale-105 active:scale-95 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
    >
      Add Property
    </div>
  );
};

export default AddPropertyButton;
