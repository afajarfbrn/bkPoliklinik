import Select from "react-select";

const ReactSelect = ({ data, title, onChange, disabled, isMulti, value }) => {
  return (
    <>
      <div className="my-3">
        <label className="text-black text-sm font-normal mb-5">{title}</label>
        <Select
          options={data}
          onChange={onChange}
          isDisabled={disabled}
          isMulti={isMulti}
          value={value}
        />
      </div>
    </>
  );
};

export default ReactSelect;
