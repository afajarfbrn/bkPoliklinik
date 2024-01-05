import { Label, Select } from "flowbite-react";

const Selects = ({ id, label, selectData }) => {
  return (
    <div className="w-full my-2">
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      <Select id={id} required>
        {selectData?.map((data, index) => (
          <option key={index}>{data}</option>
        ))}
      </Select>
    </div>
  );
};

export default Selects;
