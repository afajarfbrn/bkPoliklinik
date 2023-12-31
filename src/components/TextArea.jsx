import { Label, Textarea } from "flowbite-react";

const TextArea = ({ id, label, placeholder, name, onChange, value }) => {
  return (
    <div className="w-full">
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      <Textarea
        id={id}
        placeholder={placeholder}
        required
        rows={4}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextArea;
