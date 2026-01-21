const ToolCard = ({ title, description, icon: Icon, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        text-left w-full
        bg-white rounded-2xl p-6
        border border-gray-100
        shadow-md hover:shadow-2xl
        transition-all duration-300
        hover:-translate-y-2
        focus:outline-none
      "
    >
      {/* Icon */}
      <div
        className={`
          w-14 h-14 mb-5 rounded-xl
          flex items-center justify-center
          bg-gradient-to-r ${color}
          text-white shadow-lg
          transition-transform group-hover:scale-110
        `}
      >
        <Icon size={28} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-1">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </button>
  );
};

export default ToolCard;
