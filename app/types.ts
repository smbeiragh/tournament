export interface TournamentImage {
  filePath: string;
}

export interface Tournament {
  id: string;
  title: string;
  description: string;
  images: {
    square: TournamentImage;
    default: TournamentImage;
    banner: TournamentImage;
  };
}

export interface FavoritesService {
  add(tournament: Tournament): Promise<Tournament[]>;
  remove(id: string): Promise<Tournament[]>;
  list(): Promise<Tournament[]>;
}

export interface ThunkExtraArgs {
  favoritesService: FavoritesService;
}

export interface TournamentState {
  favorites: {
    result: Tournament[];
    isLoading: boolean;
    error?: string | null;
  };
}

export interface State {
  tournament: TournamentState;
}
