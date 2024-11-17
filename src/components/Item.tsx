import { useEffect, useState } from "react";
import { IPokemonData } from "../interfaces/pokemon";
import axios from "axios";
import { typeColors } from "../utils/utils";

interface IItemProps {
  data: { name: string; url: string };
  setActiveData: (data: IPokemonData) => void;
}

const Item = ({ data, setActiveData }: IItemProps) => {
  const [pokemon, setPokemon] = useState<IPokemonData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(data.url);
        setPokemon(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
        } else {
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    pokemon && (
      <div
        className={`relative cursor-pointer h-[112px] md:h-[142px] rounded-xl shadow-xl group ${
          typeColors[pokemon.types[0].type.name]
        }`}
        onClick={() => setActiveData(pokemon)}
      >
        <div className="absolute -left-5 -bottom-4 inset-0 bg-[url('/pokeball-white.png')] bg-no-repeat bg-left-bottom opacity-10 rounded-lg pointer-events-none bg-[length:114px_114px] md:bg-[length:144px_144px] "></div>
        <div className="relative z-10 flex flex-col h-full gap-1 p-4 md:gap-2">
          <div className="font-medium text-white capitalize md:text-lg">
            {pokemon.name}
          </div>
          <div className="flex flex-col gap-1">
            {pokemon.types.map((type) => (
              <div
                key={type.type.name}
                className="px-2 text-[11px] md:text-xs font-light text-white capitalize rounded-full bg-white/50 w-max"
              >
                {type.type.name}
              </div>
            ))}
          </div>
          <div className="absolute -right-2.5 -bottom-3 transition-transform duration-500 ease-in-out group-hover:scale-110">
            <img
              src={
                pokemon.sprites.other["dream_world"].front_default ??
                pokemon.sprites.other["official-artwork"].front_default ??
                "/default-pokemon.png"
              }
              alt=""
              className="w-28 md:w-32 h-28 md:h-32"
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Item;
