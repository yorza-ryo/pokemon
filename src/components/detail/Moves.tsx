import axios from "axios";
import { useEffect, useState } from "react";
import { IPokemonData } from "../../interfaces/pokemon";
import { typeColors } from "../../utils/utils";

interface IMovesProps {
  data: IPokemonData;
}

interface IMoveDetails {
  name: string;
  type: string;
  power: number | null;
  accuracy: number | null;
  learnedBy: string;
}

const Moves = ({ data }: IMovesProps) => {
  const [moves, setMoves] = useState<IMoveDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoveDetails = async () => {
      const detailedMoves = await Promise.all(
        data.moves.map(async (moveEntry) => {
          const response = await axios.get(moveEntry.move.url);
          const moveData = response.data;
          return {
            name: moveData.name,
            type: moveData.type.name,
            power: moveData.power,
            accuracy: moveData.accuracy,
            learnedBy:
              moveEntry.version_group_details[0]?.move_learn_method?.name ??
              "unknown",
          };
        })
      );
      setMoves(detailedMoves);
      setLoading(false);
    };

    fetchMoveDetails();
  }, [data.moves]);

  if (loading) return <div className="py-3">Loading moves...</div>;

  return (
    <div className="py-3">
      {["level-up", "machine", "egg", "unknown"].map((method) => {
        const filteredMoves = moves.filter((move) => move.learnedBy === method);

        if (filteredMoves.length === 0) return null;

        return (
          <div key={method} className="mb-6">
            <h2 className="mb-3 font-semibold text-gray-700 capitalize">
              {method.replace("-", " ")} Moves
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
              {filteredMoves.map((move, index) => (
                <div
                  key={index}
                  className="relative p-4 overflow-hidden border rounded-lg shadow-md bg-gray-50 hover:shadow-lg"
                >
                  <div className="absolute -right-3 z-0 -top-5 opacity-65 inset-0 bg-[url('/pokeball-white.png')] bg-no-repeat bg-right-top rounded-lg pointer-events-none"></div>
                  <div className="relative z-10">
                    <h3 className="font-bold text-gray-800 capitalize">
                      {move.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full text-white capitalize ${
                          typeColors[move.type]
                        }`}
                      >
                        {move.type}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      <strong>Power:</strong> {move.power ?? "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Accuracy:</strong> {move.accuracy ?? "N/A"}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Moves;
