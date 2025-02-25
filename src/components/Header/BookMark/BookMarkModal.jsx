export function BookMarkModal({ children }) {
  return (
    <div className="absolute w-full right-0 mt-3 bg-white dark:bg-[#1f1f1f] shadow-drop-shadow dark:shadow-darkmode-drop-shadow rounded-2xl transform z-10">
      {children}
    </div>
  );
}
