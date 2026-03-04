import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

// Fun emojis for the memory game
const CARD_EMOJIS = [
    { id: 1, emoji: '🚀', name: 'Cohete' },
    { id: 2, emoji: '💻', name: 'Laptop' },
    { id: 3, emoji: '🌈', name: 'Arcoíris' },
    { id: 4, emoji: '🍕', name: 'Pizza' },
    { id: 5, emoji: '🎨', name: 'Arte' },
    { id: 6, emoji: '⚡', name: 'Rayo' },
    { id: 7, emoji: '🦄', name: 'Unicornio' },
    { id: 8, emoji: '🎮', name: 'Gamepad' },
];

interface CardType {
    id: string;
    iconId: number;
    emoji: string;
    name: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const Game = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [isWon, setIsWon] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Initialize game
    const shuffleCards = () => {
        // Duplicate the icons array to create pairs
        const shuffledCards = [...CARD_EMOJIS, ...CARD_EMOJIS]
            .sort(() => Math.random() - 0.5) // Random shuffle
            .map((card, index) => ({
                id: `${card.id}-${index}`, // Unique ID for each card
                iconId: card.id,
                emoji: card.emoji,
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
    };

    useEffect(() => {
        shuffleCards();
    }, []);

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    const handleCardClick = (index: number) => {
        // Prevent clicking if animating, or if card is already flipped/matched
        if (isAnimating || cards[index].isFlipped || cards[index].isMatched) return;

        // Flip the selected card
        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        // If 2 cards are flipped, check for a match
        if (newFlippedCards.length === 2) {
            setIsAnimating(true);
            setMoves((m) => m + 1);

            const [firstIndex, secondIndex] = newFlippedCards;

            if (cards[firstIndex].iconId === cards[secondIndex].iconId) {
                // Match found
                setTimeout(() => {
                    const matchedCards = [...cards];
                    matchedCards[firstIndex].isMatched = true;
                    matchedCards[secondIndex].isMatched = true;

                    setCards(matchedCards);
                    setFlippedCards([]);
                    setMatches((m) => m + 1);
                    setIsAnimating(false);

                    // Check if won
                    if (matches + 1 === CARD_EMOJIS.length) {
                        setIsWon(true);
                        triggerConfetti();
                    }
                }, 500);
            } else {
                // No match
                setTimeout(() => {
                    const resetCards = [...cards];
                    resetCards[firstIndex].isFlipped = false;
                    resetCards[secondIndex].isFlipped = false;

                    setCards(resetCards);
                    setFlippedCards([]);
                    setIsAnimating(false);
                }, 1000); // 1 second delay to let user see cards
            }
        }
    };

    return (
        <section className="relative z-10 section-padding" id="game">
            <div className="container">
                <h2 className="section-title">
                    <span>Tómate un descanso</span>
                    Emoji Match Game
                </h2>

                <div className="max-w-[800px] mx-auto p-6 sm:p-10 flex flex-col items-center gap-8 glass-panel">
                    <div className="flex flex-wrap justify-center items-center gap-6 w-full pb-8 border-b border-border">
                        <div className="text-[1.1rem] font-medium bg-white/5 py-2 px-4 rounded-full border border-glass-border">Movimientos: <span className="gradient-text">{moves}</span></div>
                        <div className="text-[1.1rem] font-medium bg-white/5 py-2 px-4 rounded-full border border-glass-border">Pares encontrados: <span className="gradient-text">{matches} / 8</span></div>
                        <button onClick={shuffleCards} className="btn btn-secondary py-2 px-4 text-[0.9rem]">Reiniciar Juego</button>
                    </div>

                    {isWon ? (
                        <div className="text-center p-12 flex flex-col items-center gap-4 animate-fade-in">
                            <div className="text-7xl mb-4 animate-bounce">🏆</div>
                            <h3 className="text-5xl gradient-text font-bold">¡Lo lograste!</h3>
                            <p className="text-xl text-text-secondary">Completaste el reto en {moves} movimientos.</p>
                            <button onClick={shuffleCards} className="btn btn-primary mt-4 py-3 px-8 text-lg">
                                Jugar de nuevo 🔄
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full">
                            {cards.map((card, index) => (
                                <div
                                    key={card.id}
                                    className="aspect-square cursor-pointer group"
                                    style={{ perspective: '1000px' }}
                                    onClick={() => handleCardClick(index)}
                                >
                                    <div className={`relative w-full h-full text-center transition-transform duration-700 ease-[cubic-bezier(0.4,0.0,0.2,1)] ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
                                        <div className="absolute w-full h-full rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-glass-border text-text-primary text-2xl font-bold shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-indigo-500/40 group-hover:to-purple-500/40 group-hover:shadow-[0_4px_15px_rgba(168,85,247,0.3)]" style={{ backfaceVisibility: 'hidden' }}>
                                            <span className="opacity-50 text-3xl">❓</span>
                                        </div>
                                        <div className="absolute w-full h-full rounded-xl flex items-center justify-center bg-glass-bg border border-accent-primary shadow-[0_0_15px_rgba(99,102,241,0.3)] text-5xl rotate-y-180" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                            {card.emoji}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style>
                {`
                    .rotate-y-180 {
                        transform: rotateY(180deg) !important;
                    }
                `}
            </style>
        </section>
    );
};

export default Game;
