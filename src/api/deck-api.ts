const BASE_URL = 'https://deckofcardsapi.com/api/deck';

export interface DeckResponse {
  success: boolean;
  deck_id: string;
  remaining: number;
  shuffled: boolean;
}

export interface CardData {
  code: string;
  image: string;
  images: { svg: string; png: string };
  value: string;
  suit: string;
}

export interface DrawResponse {
  success: boolean;
  deck_id: string;
  cards: CardData[];
  remaining: number;
}

export async function shuffleNewDeck(): Promise<DeckResponse> {
  const res = await fetch(`${BASE_URL}/new/shuffle/?deck_count=1`);
  if (!res.ok) throw new Error('Failed to shuffle new deck');
  const data = await res.json() as DeckResponse;
  if (!data.success) throw new Error('Failed to shuffle new deck');
  return data;
}

export async function drawCard(deckId: string): Promise<DrawResponse> {
  const res = await fetch(`${BASE_URL}/${deckId}/draw/?count=1`);
  if (!res.ok) throw new Error('Failed to draw card');
  const data = await res.json() as DrawResponse;
  if (!data.success) throw new Error('Failed to draw card');
  if (!data.cards.length) throw new Error('No cards returned');
  return data;
}
