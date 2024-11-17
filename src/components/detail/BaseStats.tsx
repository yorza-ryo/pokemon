import { IPokemonData } from "../../interfaces/pokemon";

interface IBaseStatsProps {
  data: IPokemonData;
}

const BaseStats = ({ data }: IBaseStatsProps) => {
  return (
    <div className="flex flex-col gap-3 py-3">
      {data.stats.map((stat, index) => (
        <div className="flex items-center w-full gap-8" key={index}>
          <div className="text-gray-500 min-w-[30%] capitalize">
            {stat.stat.name}
          </div>
          <div className="flex items-center w-full gap-2">
            <span className="flex justify-end w-6 text-sm text-gray-800">
              {stat.base_stat}
            </span>
            <div className="w-full p-0.5 overflow-hidden bg-white shadow rounded-xl">
              <div className="relative flex items-center justify-center h-3">
                <div
                  className={`absolute top-0 bottom-0 left-0 rounded-lg ${
                    (stat.base_stat / 255) * 100 > 50
                      ? "bg-green-200"
                      : "bg-red-200"
                  }`}
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BaseStats;
