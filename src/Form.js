import { useState } from "react";

export default function Form({ onAddItems }) {
  const [desc, setdesc] = useState("");
  const [quantity, setquantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!desc) return;
    const item = {
      description: desc,
      quantity: quantity,
      packed: false,
      id: Date.now(),
    };
    onAddItems(item);

    setdesc((c) => (c = ""));
    setquantity((c) => (c = 1));
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What things do you need ? 😊</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setquantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, ind) => ind + 1).map((i) => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>
      <input
        value={desc}
        onChange={(e) => {
          setdesc(e.target.value);
        }}
        type="text"
        placeholder="Item..."
      ></input>
      <button>Add</button>
    </form>
  );
}
