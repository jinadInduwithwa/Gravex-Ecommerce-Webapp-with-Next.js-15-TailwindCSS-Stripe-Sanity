"use client";
import React from "react";
import {
  Grid3x3,
  LayoutGrid,
  ImageIcon,
} from "lucide-react";

export type ViewType = "grid" | "compact" | "showcase";

interface ViewOptionsProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const viewOptions: Array<{
  id: ViewType;
  label: string;
  icon: React.ReactNode;
}> = [
  {
    id: "grid",
    label: "Grid View",
    icon: <Grid3x3 size={20} />,
  },
  {
    id: "compact",
    label: "Compact Grid",
    icon: <LayoutGrid size={20} />,
  },
  {
    id: "showcase",
    label: "Showcase View",
    icon: <ImageIcon size={20} />,
  },
];

const ViewOptions: React.FC<ViewOptionsProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <div className="flex items-center gap-2   p-2 md:p-3">
      {viewOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => onViewChange(option.id)}
          className={`p-2 md:p-2.5 rounded transition-all duration-200 flex items-center justify-center gap-2 flex-col md:flex-row tooltip group`}
          title={option.label}
        >
          <div
            className={`transition-all duration-200 ${
              currentView === option.id
                ? "text-darkColor"
                : "text-gray-500 hover:text-darkColor"
            }`}
          >
            {option.icon}
          </div>
          <span
            className={`text-xs md:text-sm font-medium hidden lg:block transition-all duration-200 ${
              currentView === option.id
                ? "text-darkColor"
                : "text-gray-500 group-hover:text-darkColor"
            }`}
          >
            {option.label}
          </span>
          {currentView === option.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-darkColor rounded-t hidden md:block"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default ViewOptions;
