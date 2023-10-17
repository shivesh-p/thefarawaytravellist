import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
