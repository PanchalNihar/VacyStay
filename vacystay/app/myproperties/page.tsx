import Propertylist from "../components/properties/Propertylist";
const MyProperty = () => {
  return (
    <div className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">My Property</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <Propertylist />
          </div>
    </div>
  );
};
export default MyProperty;
