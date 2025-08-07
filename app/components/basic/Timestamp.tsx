export default function Timestamp() {
  const time = new Date().getFullYear();
  return <span>{time}</span>;
}
