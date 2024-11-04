export default function Container({ children, className, style }) {
  return (
    <div
      style={style}
      className={`w-10/12 flex flex-col items-center justify-center bg-center bg-cover max-w-screen-xl ${className}`}
    >
      {children}
    </div>
  );
}
