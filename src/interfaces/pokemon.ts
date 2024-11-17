export interface IPokemonData {
  abilities: IAbility[];
  base_experience: number;
  cries: ICries;
  forms: IForm[];
  game_indices: IGameIndex[];
  height: number;
  held_items: IHeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: IMove[];
  name: string;
  order: number;
  past_abilities: any[];
  past_types: any[];
  species: IResource;
  sprites: ISprites;
  stats: IStats[];
  types: ITypes[];
  weight: number;
}

export interface IStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface ITypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IAbility {
  ability: IResource;
  is_hidden: boolean;
  slot: number;
}

export interface IResource {
  name: string;
  url: string;
}

export interface ICries {
  latest: string;
  legacy: string;
}

export interface IForm {
  name: string;
  url: string;
}

export interface IGameIndex {
  game_index: number;
  version: IResource;
}

export interface IHeldItem {
  item: IResource;
  version_details: IVersionDetail[];
}

export interface IVersionDetail {
  rarity: number;
  version: IResource;
}

export interface IMove {
  move: IResource;
  version_group_details: IVersionGroupDetail[];
}

export interface IVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: IResource;
  version_group: IResource;
}

export interface ISprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: IOtherSprites;
  versions: IVersions;
}

export interface IOtherSprites {
  dream_world: ISpriteVariants;
  home: ISpriteVariants;
  "official-artwork": ISpriteVariants;
  showdown: ISpriteVariants;
}

export interface ISpriteVariants {
  front_default: string | null;
  front_female: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
  back_default?: string | null;
  back_female?: string | null;
  back_shiny?: string | null;
  back_shiny_female?: string | null;
}

export interface IVersions {
  "generation-i": IGenerationSprites;
  "generation-ii": IGenerationSprites;
  "generation-iii": IGenerationSprites;
  "generation-iv": IGenerationSprites;
  "generation-v": IGenerationSprites;
  "generation-vi": IGenerationSprites;
  "generation-vii": IGenerationSprites;
}

export interface IGenerationSprites {
  [key: string]: {
    front_default: string | null;
    back_default?: string | null;
    front_shiny?: string | null;
    back_shiny?: string | null;
    front_female?: string | null;
    back_female?: string | null;
  };
}

export interface IData {
  count: number;
  next: string;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface ISpeciesData {
  gender_rate: number;
  egg_groups: { name: string }[];
  hatch_counter: number;
  evolution_chain: { url: string };
  genera: {
    genus: string;
    language: {
      name: string;
      url: string;
    };
  }[];
}

export interface IEvolutionChain {
  chain: {
    species: { name: string };
    evolves_to: {
      species: { name: string };
      evolves_to: { species: { name: string } }[];
    }[];
  };
}
