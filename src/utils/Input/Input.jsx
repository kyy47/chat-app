import "./input.css";

const Input = ({ type, name, placeholder, value, setValue }) => {
  return (
    <div className="input">
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </div>
  );
};

export default Input;
