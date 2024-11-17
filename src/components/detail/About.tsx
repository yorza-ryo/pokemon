import { IPokemonData, ISpeciesData } from "../../interfaces/pokemon";

interface IAboutProps {
  data: IPokemonData;
  detail: ISpeciesData | null;
}

const About = ({ data, detail }: IAboutProps) => {
  const gender =
    detail?.gender_rate === -1
      ? "Genderless"
      : `Male: ${((8 - detail?.gender_rate!) / 8) * 100}%, Female: ${
          (detail?.gender_rate! / 8) * 100
        }%`;
  const eggGroups = detail?.egg_groups.map((group) => group.name).join(", ");
  const hatchCounter = detail?.hatch_counter! * 255;

  const englishGenus =
    detail?.genera.find((genus) => genus.language.name === "en")?.genus ||
    "Unknown";

  return (
    <div className="flex flex-col gap-5 py-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center w-full gap-8">
          <div className="w-1/5 text-gray-500">Species</div>
          <div>{englishGenus}</div>
        </div>
        <div className="flex items-center w-full gap-8">
          <div className="w-1/5 text-gray-500">Height</div>
          <div>{data.height / 10} m</div>
        </div>
        <div className="flex items-center w-full gap-8">
          <div className="w-1/5 text-gray-500">Weight</div>
          <div>{data.weight / 10} kg</div>
        </div>
        <div className="flex items-center w-full gap-8">
          <div className="w-1/5 text-gray-500">Abilities</div>
          <div className="capitalize">
            {data.abilities.map((a) => a.ability.name).join(", ")}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-base font-bold">Breeding</div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center w-full gap-8">
            <div className="w-1/5 text-gray-500">Gender</div>
            <div>{gender}</div>
          </div>
          <div className="flex items-center w-full gap-8">
            <div className="w-1/5 text-gray-500">Egg Groups</div>
            <div className="capitalize">{eggGroups}</div>
          </div>
          <div className="flex items-center w-full gap-8">
            <div className="w-1/5 text-gray-500">Egg Cycle</div>
            <div>{hatchCounter}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
