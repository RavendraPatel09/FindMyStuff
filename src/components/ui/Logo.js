import React from "react";
import { Search, MapPin, Sparkles } from "lucide-react";

const Logo = ({ size = "default", className = "", showText = true }) => {
  const sizeClasses = {
    small: { container: "h-8", icon: "w-5 h-5", text: "text-lg" },
    medium: { container: "h-10", icon: "w-6 h-6", text: "text-lg" },
    default: { container: "h-12", icon: "w-7 h-7", text: "text-xl" },
    large: { container: "h-16", icon: "w-9 h-9", text: "text-2xl" },
    xlarge: { container: "h-20", icon: "w-11 h-11", text: "text-3xl" }
  };

  const currentSize = sizeClasses[size] || sizeClasses.default;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Modern Logo Icon */}
      <div className={`${currentSize.container} aspect-square bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-3xl flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105 group relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-60"></div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-white/20 rounded-full blur-sm"></div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white/15 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/10 rounded-full animate-pulse"></div>
        
        {/* Main Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <Search className={`${currentSize.icon} text-white group-hover:rotate-12 transition-transform duration-300 drop-shadow-lg`} />
          <MapPin className={`${currentSize.icon} text-white/90 absolute -bottom-1 -right-1 transform scale-75 group-hover:scale-90 transition-transform duration-300 drop-shadow-md`} />
          <Sparkles className={`w-3 h-3 text-white/70 absolute -top-1 -left-1 group-hover:animate-pulse transition-all duration-300`} />
        </div>
        
        {/* Pulse Effect */}
        <div className="absolute inset-0 bg-primary-300 rounded-3xl animate-ping opacity-20 group-hover:opacity-30"></div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${currentSize.text} font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent leading-tight`}>
            FindMyItem
          </span>
          {size === 'large' || size === 'xlarge' ? (
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium -mt-1">
              Campus Lost & Found
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Logo;
