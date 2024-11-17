import { useEffect, useState } from "react";
import { IData, IPokemonData } from "../interfaces/pokemon";
import axios from "axios";
import Item from "./Item";
import InfiniteScroll from "react-infinite-scroll-component";
import Detail from "./Detail";

const List = () => {
  const [data, setData] = useState<IData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [activeData, setActiveData] = useState<IPokemonData | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=30&offset=0`
        );
        setData(response.data);
        setHasMore(response.data.next !== null);
        setError(null);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const fetchMoreData = async () => {
    if (!data?.next) {
      setHasMore(false);
      return;
    }

    try {
      const response = await axios.get(data.next);

      setData((prev) => ({
        ...prev!,
        next: response.data.next,
        results: [...prev!.results, ...response.data.results],
      }));

      setHasMore(response.data.next !== null);
    } catch (err: unknown) {
      setError("Failed to fetch more data");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div
        id="scrollableDiv"
        className="flex-1 max-h-[calc(100dvh-92px)] md:max-h-[calc(100dvh-100px)] overflow-y-auto"
      >
        {error && <div className="text-red-500">{error}</div>}

        <InfiniteScroll
          dataLength={data?.results.length || 0}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="flex items-center justify-center w-full h-20 text-lg text-center">
              Please wait...
            </div>
          }
          scrollableTarget="scrollableDiv"
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(162px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 md:gap-6">
            {loading ? (
              <div>Loading...</div>
            ) : (
              data?.results.map((item, index) => (
                <Item
                  key={index}
                  data={item}
                  setActiveData={(data: IPokemonData) => setActiveData(data)}
                />
              ))
            )}
          </div>
        </InfiniteScroll>
      </div>
      {activeData && (
        <Detail data={activeData} close={() => setActiveData(null)} />
      )}
    </div>
  );
};

export default List;
