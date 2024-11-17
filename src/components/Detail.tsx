import { Icon } from "@iconify/react/dist/iconify.js";
import { IPokemonData, ISpeciesData } from "../interfaces/pokemon";
import { typeColors } from "../utils/utils";
import { useEffect, useState } from "react";
import { menuTabs } from "../constants";
import About from "./detail/About";
import BaseStats from "./detail/BaseStats";
import Evolution from "./detail/Evolution";
import Moves from "./detail/Moves";
import axios from "axios";

interface IDetailProps {
  data: IPokemonData;
  close: () => void;
}
const Detail = ({ data, close }: IDetailProps) => {
  const [activeTab, setActiveTab] = useState("about");
  const [like, setLike] = useState(false);
  const [speciesData, setSpeciesData] = useState<ISpeciesData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const speciesResponse = await axios.get(data.species.url);
        setSpeciesData(speciesResponse.data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black/90 md:flex-1 md:h-[calc(100dvh-100px)] max-md:fixed max-md:top-0 max-md:left-0 max-md:h-[100dvh] max-md:w-[100dvw] z-10  md:rounded-t-xl overflow-hidden">
      <div className={`${typeColors[data.types[0].type.name]} h-full relative`}>
        <div className="flex items-center justify-between px-4 pt-[18px] pb-2">
          <div className="text-white" onClick={() => close()}>
            <Icon
              icon="fluent:arrow-left-16-filled"
              className="text-xl text-white cursor-pointer"
            />
          </div>
          <div onClick={() => setLike((prev) => !prev)}>
            <Icon
              icon={like ? "mdi:heart" : "mdi:heart-outline"}
              className="text-2xl text-white cursor-pointer"
            />
          </div>
        </div>
        <div className="absolute -left-28 -top-10 inset-0 bg-[url('/rect2.png')] bg-no-repeat bg-left-top opacity-5 rounded-lg pointer-events-none bg-[length:280px]"></div>
        <div className="absolute -right-10 top-[15%] inset-0 bg-[url('/pokeball-white.png')] bg-no-repeat bg-right-top opacity-10 rounded-lg pointer-events-none bg-[length:280px]"></div>
        <div className="absolute -right-40 top-0 inset-0 bg-[url('/dots.png')] bg-no-repeat bg-top opacity-[0.04] rounded-lg pointer-events-none bg-[length:110px]"></div>
        <div className="flex flex-col gap-2 px-4">
          <div className="relative text-2xl text-white capitalize">
            {data.name}
            <div className="absolute text-base font-bold text-white/50 right-3 top-4">
              #{data.id.toString().padStart(3, "0")}
            </div>
          </div>
          <div className="flex gap-2">
            {data.types.map((type) => (
              <div
                key={type.type.name}
                className="px-2.5 py-0.5 text-xs font-light text-white capitalize rounded-full md:text-sm bg-white/50 w-max"
              >
                {type.type.name}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-[60%] bg-white rounded-t-3xl">
          <div className="relative flex justify-center">
            <img
              src={
                data.sprites.other["dream_world"].front_default ??
                data.sprites.other["official-artwork"].front_default ??
                "/default-pokemon.png"
              }
              alt=""
              className="absolute -bottom-12 w-[240px] h-[240px]"
            />
          </div>
          <div className="flex justify-center px-6 mt-16">
            <div className="flex items-center justify-between w-full pb-2.5 border-b border-gray-300">
              {menuTabs.map((menuTab) => (
                <div
                  key={menuTab.id}
                  className={`cursor-pointer hover:font-medium relative ${
                    activeTab === menuTab.value &&
                    "font-semibold hover:!font-semibold"
                  }`}
                  onClick={() => setActiveTab(menuTab.value)}
                >
                  {menuTab.name}
                  {activeTab === menuTab.value && (
                    <div
                      className={`absolute w-full h-0.5 rounded-full -bottom-3 ${
                        typeColors[data.types[0].type.name]
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="px-6 max-h-[calc(100%-99px)] md:max-h-[calc(100%-90px)] overflow-y-auto">
            {activeTab === "about" && (
              <About data={data} detail={speciesData} />
            )}
            {activeTab === "baseStats" && <BaseStats data={data} />}
            {activeTab === "evolution" && (
              <Evolution speciesUrl={data.species.url} />
            )}
            {activeTab === "moves" && <Moves data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
