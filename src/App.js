import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];
export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItems(id) {
    setItems((items) => items.filter((t) => t.id !== id));
  }
  function handlePackedItems(id) {
    setItems((items) =>
      items.map((t) => (t.id === id ? { ...t, packed: !t.packed } : t))
    );
  }
  function handleClearItems() {
    if (window.confirm("Are you sure you want to clear the list ?"))
      setItems([]);
  }
  return (
    <div className="app">
      <Logo></Logo>
      <Form onAddItems={handleAddItems}></Form>
      <PackingList
        onDeleteItems={handleDeleteItems}
        onPackClicked={handlePackedItems}
        clearedClick={handleClearItems}
        items={items}
      ></PackingList>
      <Stats items={items}></Stats>
    </div>
  );
}

function Logo() {
  return <h1>✈️FAR AWAY💼</h1>;
}

function Form({ onAddItems }) {
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

function PackingList({ items, onDeleteItems, onPackClicked, clearedClick }) {
  const [sort, setsort] = useState("input");
  function onDeleteClicked(id) {
    onDeleteItems(id);
  }
  let sortedList = items;
  if (sort === "input") sortedList = items;
  if (sort === "description")
    sortedList = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sort === "packed")
    sortedList = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedList.map((item) => (
          <Item
            onDeleteClick={onDeleteClicked}
            onPackClick={onPackClicked}
            item={item}
            key={item.id}
          ></Item>
        ))}
      </ul>

      <div className="actions">
        <select
          onChange={(e) => setsort((sort) => (sort = e.target.value))}
          value={sort}
        >
          <option value="input">Sort By Added Order</option>
          <option value="description">Sort By Description</option>
          <option value="packed">Sort By Packed</option>
        </select>
        <button onClick={clearedClick}>Clear List</button>
      </div>
    </div>
  );
}
function Item({ item, onDeleteClick, onPackClick }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onPackClick(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteClick(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <em>There's nothing here 🤷‍♂️, add some items 😁</em>
      </footer>
    );
  }

  const total = items.length;
  const packed = items.filter((t) => t.packed).length;
  let per = 0;
  if (total !== 0) {
    per = (packed / total) * 100;
  }
  const formattedNum = per === 0 || per === 100 ? per : per.toPrecision(4);
  return (
    <footer className="stats">
      <em>
        {formattedNum === 100
          ? "You got it all man 👌! Less Rock'n'Roll 🥳"
          : `💼 You have ${total} items on your list and you already packed ${packed} (
        ${formattedNum} %)`}
      </em>
    </footer>
  );
}
