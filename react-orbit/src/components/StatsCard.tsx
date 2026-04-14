type StatsCardProps = {
    label: string;
    value: string | number;
    borderColor?: string;
}   

const StatsCard = ({ label, value, borderColor }: StatsCardProps) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border-l-4 p-4 sm:p-6 md:p-8"
      style={{ borderLeftColor: borderColor }}>
      
      <h3 className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide text-[#424654] truncate">{label}</h3>
      <p className="text-xl sm:text-2xl md:text-4xl font-bold font-manrope text-[#191c1e] mt-2">{value}</p>
    </div>
  )
}

export default StatsCard;