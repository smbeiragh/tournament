import { FavoritesService, Tournament } from '../types';
export default function createFavoritesService(): FavoritesService {
  const service = {
    async add(tournament: Tournament) {
      const items = await service.list();
      if (!items.find((item) => item.id === tournament.id)) {
        items.push({
          id: tournament.id,
          title: tournament.title,
          description: tournament.description,
          images: tournament.images,
        });
      }
      localStorage.setItem('favTournaments', JSON.stringify(items));
      return items;
    },
    async remove(id: string) {
      const items = await service.list();
      const newItems = items.filter((item) => item.id !== id);
      if (newItems.length < items.length) {
        localStorage.setItem('favTournaments', JSON.stringify(newItems));
      }
      return newItems;
    },
    async list(): Promise<Tournament[]> {
      const items = localStorage.getItem('favTournaments');
      if (items) {
        return JSON.parse(items);
      }
      return [];
    },
  };

  return service;
}
