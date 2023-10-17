export default function Stats({ items }) {
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
