import { cn } from "@/lib/utils";
import { ShieldCheck, Award, HeartHandshake, Sparkles } from "lucide-react";
import { whyData } from "@/constants";

const iconMap = {
  ShieldCheck,
  Award,
  HeartHandshake,
  Sparkles,
};

const QualityCommitment = () => {
  return (
    <div className="max-w-[1280px] mx-auto my-40 px-12">
      <h2
        className={cn(
          "text-gray-700 dark:text-gray-300 font-semibold",
          "text-3xl xs:text-3xl md:text-4xl text-center"
        )}
      >
        Our Commitment to Excellence
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
        {whyData.map((item, idx) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap];
          return (
            <div
              key={idx}
              className="mt-4 flex flex-col items-center text-primary"
            >
              {IconComponent && <IconComponent className="w-20 h-20 stroke-[1] text-gray-600 dark:text-gray-400" />}

              <p
                className={cn(
                  "text-gray-600 dark:text-gray-400",
                  "text-xl mt-4 text-center"
                )}
              >
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { QualityCommitment };