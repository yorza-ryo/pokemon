import "./App.css";
import List from "./components/List";
import { Icon } from "@iconify/react";

function App() {
  return (
    <main className="mx-auto max-w-[1440px] flex flex-col px-4 md:px-20 relative">
      <div className="absolute -right-[7%] -top-[17%] inset-0 bg-[url('/pokeball-gray.png')] bg-no-repeat bg-right-top opacity-15 rounded-lg pointer-events-none bg-[length:390px]"></div>
      <div className="flex flex-col w-full gap-2 my-4">
        <div className="flex items-center justify-between">
          <Icon
            icon="fluent:arrow-left-16-filled"
            className="text-xl text-gray-500 cursor-pointer"
          />
          <Icon
            icon="f7:menu"
            className="text-2xl text-gray-500 cursor-pointer"
          />
        </div>
        <div className="text-lg font-bold md:text-2xl">Pokédex</div>
      </div>
      <List />
    </main>
  );
}

export default App;
