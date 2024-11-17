import axios from "axios";
import { useEffect, useState } from "react";

interface IEvolutionProps {
  speciesUrl: string;
}

interface EvolutionChain {
  species: { name: string; url: string };
  evolves_to: EvolutionChain[];
  evolution_details: {
    trigger: { name: string };
    min_level: number | null;
    item: { name: string } | null;
  }[];
}

const Evolution = ({ speciesUrl }: IEvolutionProps) => {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(
    null
  );
  const [megaEvolution, setMegaEvolution] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      try {
        const speciesResponse = await axios.get(speciesUrl);
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

        const evolutionResponse = await axios.get(evolutionChainUrl);
        setEvolutionChain(evolutionResponse.data.chain);

        const speciesId = speciesUrl.split("/").slice(-2, -1)[0];
        const megaNames = [
          `Mega ${speciesResponse.data.name}`,
          `Mega ${speciesResponse.data.name} X`,
          `Mega ${speciesResponse.data.name} Y`,
        ];

        const availableMegaEvolutions = await Promise.all(
          megaNames.map(async (name) => {
            const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`;
            try {
              await axios.head(url);
              return name;
            } catch {
              return null;
            }
          })
        );
        setMegaEvolution(availableMegaEvolutions.filter(Boolean) as string[]);
      } catch (err: unknown) {
        setError("Failed to fetch evolution data");
      } finally {
        setLoading(false);
      }
    };

    fetchEvolutionData();
  }, [speciesUrl]);

  const renderEvolutionChain = (chain: EvolutionChain) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                chain.species.url.split("/").slice(-2, -1)[0]
              }.png`}
              alt={chain.species.name}
              className="flex-1 w-24 h-24"
            />
            <span className="capitalize">{chain.species.name}</span>
          </div>

          {chain.evolution_details.length > 0 && (
            <div className="flex flex-col items-center text-sm text-gray-500">
              {chain.evolution_details[0].trigger.name === "level-up"
                ? `Level ${chain.evolution_details[0].min_level}`
                : chain.evolution_details[0].item?.name || "Other"}
            </div>
          )}

          {chain.evolves_to.length > 0 && (
            <div className="flex flex-wrap items-center gap-4">
              {chain.evolves_to.map((evolution, index) => (
                <div key={index}>{renderEvolutionChain(evolution)}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMegaEvolution = () => {
    return (
      <div className="flex flex-col gap-4">
        {megaEvolution.map((mega, index) => (
          <div className="flex items-center gap-4" key={index}>
            <div className="flex flex-col items-center">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  index + 1
                }.png`}
                alt={mega}
                className="w-24 h-24"
              />
              <span className="capitalize">{mega}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <div className="py-3">Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!evolutionChain) return <div>No evolution data available</div>;

  return (
    <div className="flex flex-col gap-8 py-3">
      <div>
        <h2 className="mb-4 text-xl font-bold">Evolution Chain</h2>
        {renderEvolutionChain(evolutionChain)}
      </div>

      {megaEvolution.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-bold">Mega Evolution</h2>
          {renderMegaEvolution()}
        </div>
      )}
    </div>
  );
};

export default Evolution;
