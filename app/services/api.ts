import fetch from 'isomorphic-unfetch';

export default function createApi() {
  let baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    console.error('Please define process.env.NEXT_PUBLIC_API_BASE_URL');
  }

  // remove possible trailing slash
  baseUrl = (baseUrl as string).replace(/\/$/, '');

  return {
    async searchTournament({ query }: { query: string }) {
      return fetch(`${baseUrl}/search?q=${encodeURIComponent(query)}&index=tournament`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    },
  };
}
