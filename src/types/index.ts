// --- Shared Types ---

export interface ISkill {
    name: string;
    level: number;
}

export interface IFeature {
    title: string;
    description: string;
    icon: JSX.Element;
}

export interface IProject {
    title: string;
    description: string;
    image: string;
    tags: string[];
    liveUrl: string;
    githubUrl: string;
}

export interface ICardIcon {
    id: number;
    icon: JSX.Element;
    name: string;
}

export interface IGameCard {
    id: string;
    iconId: number;
    icon: JSX.Element;
    name: string;
    isFlipped: boolean;
    isMatched: boolean;
}

export interface IHeroStats {
    title: string;
    description: string;
}
