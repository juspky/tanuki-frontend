const Card: React.FC<{ className?: string }> = ({ children, className }) => {
  return (
    <div
      className={`shadow-md hover:shadow-lg transition-shadow ease-in-out duration-100 bg-gray-900 px-3 rounded-lg ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
