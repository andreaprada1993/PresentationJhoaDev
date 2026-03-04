import { useState, useEffect, useCallback } from 'react';
import { IGameCard, ICardIcon } from '../types';

interface UseMemoryGameReturn {
    cards: IGameCard[];
    moves: number;
    matches: number;
    isWon: boolean;
    totalPairs: number;
    handleCardClick: (index: number) => void;
    resetGame: () => void;
}

export const useMemoryGame = (icons: ICardIcon[]): UseMemoryGameReturn => {
    const [cards, setCards] = useState<IGameCard[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [isWon, setIsWon] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const totalPairs = icons.length;

    const shuffleCards = useCallback(() => {
        const shuffledCards = [...icons, ...icons]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({
                id: `${card.id}-${index}`,
                iconId: card.id,
                icon: card.icon,
                name: card.name,
                isFlipped: false,
                isMatched: false,
            }));

        setCards(shuffledCards);
        setFlippedCards([]);
        setMoves(0);
        setMatches(0);
        setIsWon(false);
        setIsAnimating(false);
    }, [icons]);

    useEffect(() => {
        shuffleCards();
    }, [shuffleCards]);

    const handleCardClick = useCallback((index: number) => {
        if (isAnimating || cards[index].isFlipped || cards[index].isMatched) return;

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setIsAnimating(true);
            setMoves((m) => m + 1);

            const [firstIndex, secondIndex] = newFlippedCards;

            if (cards[firstIndex].iconId === cards[secondIndex].iconId) {
                setTimeout(() => {
                    const matchedCards = [...cards];
                    matchedCards[firstIndex].isMatched = true;
                    matchedCards[secondIndex].isMatched = true;

                    setCards(matchedCards);
                    setFlippedCards([]);
                    setMatches((m) => m + 1);
                    setIsAnimating(false);

                    if (matches + 1 === totalPairs) {
                        setIsWon(true);
                    }
                }, 500);
            } else {
                setTimeout(() => {
                    const resetCards = [...cards];
                    resetCards[firstIndex].isFlipped = false;
                    resetCards[secondIndex].isFlipped = false;

                    setCards(resetCards);
                    setFlippedCards([]);
                    setIsAnimating(false);
                }, 1000);
            }
        }
    }, [cards, flippedCards, isAnimating, matches, totalPairs]);

    return {
        cards,
        moves,
        matches,
        isWon,
        totalPairs,
        handleCardClick,
        resetGame: shuffleCards
    };
};
