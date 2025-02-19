export function BreakLine({ width = "full", height = "1px", margin = "0 " }) {
  return (
    <div
      style={{ width, height, margin }}
      className=" bg-[#e9e9e9] flex-grow"
    ></div>
  );
}
