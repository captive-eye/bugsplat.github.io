const BadgeIcon = ({ color, Icon }) => (
  <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-md ${color}`}>
    <Icon />
  </div>
);

export default BadgeIcon;