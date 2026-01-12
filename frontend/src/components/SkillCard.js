function SkillCard({ skill, index, mobile = false }) {
  return (
    <div
      className="relative group skill-card"
      style={{
        transform: 'translateZ(0)',
      }}
    >
      {/* Card glow */}
      <div className="absolute inset-0 rounded-2xl md:rounded-[2rem] bg-white opacity-0 blur-2xl transition-opacity duration-500"
        style={{ opacity: 0 }} />

      {/* Main card */}
      <div className={`relative ${mobile ? 'w-40 h-40 sm:w-48 sm:h-48' : 'w-64 h-64'} rounded-2xl md:rounded-[2rem] border border-gray-800 bg-gradient-to-br from-gray-900 to-[#030303] backdrop-blur-xl flex flex-col items-center justify-center ${mobile ? 'gap-3 sm:gap-4' : 'gap-6'} shadow-2xl overflow-hidden transition-all duration-500`}>
        {/* Inner glow */}
        <div className="absolute inset-[1px] rounded-2xl md:rounded-[2rem] bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

        {/* Icon */}
        <div className={`${mobile ? 'text-5xl sm:text-6xl' : 'text-[7rem]'} leading-none`}>
          <span style={{color: skill.color}}>{skill.icon}</span>
        </div>

        {/* Name */}
        <div className={`text-white font-display font-bold ${mobile ? 'text-base sm:text-lg' : 'text-2xl'} tracking-tight`}>
          {skill.name}
        </div>

        {/* Position indicator */}
        <div className={`absolute top-3 right-3 ${mobile ? 'w-6 h-6' : 'w-8 h-8'} rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400 ${mobile ? 'text-[10px]' : 'text-xs'} font-mono`}>
          {index + 1}
        </div>
      </div>
    </div>
  );
}

export default SkillCard;