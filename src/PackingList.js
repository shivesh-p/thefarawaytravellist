import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItems,
  onPackClicked,
  clearedClick,
}) {
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
