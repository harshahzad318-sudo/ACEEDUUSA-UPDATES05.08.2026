"use client";

export default function Logo({
  className = "",
  size = "default",
  light = false,
}: {
  className?: string;
  size?: "small" | "default" | "large";
  light?: boolean;
}) {
  const containerSizes = {
    small: "w-9 h-9 p-1 rounded-lg",
    default: "w-11 h-11 p-1.5 rounded-xl",
    large: "w-14 h-14 p-2 rounded-2xl",
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0 ${containerSizes[size]}`}>
        <img
          src="https://drive.google.com/thumbnail?id=1V_yl0l4lk5DlYsjb3jksFSq745E3LO-g&sz=w1000"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('drive.google.com')) {
              target.src = 'https://lh3.googleusercontent.com/d/1V_yl0l4lk5DlYsjb3jksFSq745E3LO-g';
            } else if (target.src.includes('googleusercontent.com')) {
              target.src = '/logo.png';
            }
          }}
          alt="ACE Education Official Logo"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span
          className={`font-extrabold tracking-tight ${
            light ? "text-white" : "text-navy"
          } ${size === "large" ? "text-2xl" : size === "small" ? "text-base" : "text-xl"}`}
        >
          ACE Education
        </span>
        <span
          className={`text-gold font-semibold tracking-widest uppercase ${
            size === "large" ? "text-xs" : "text-[10px]"
          }`}
        >
          USA
        </span>
      </div>
    </div>
  );
}
