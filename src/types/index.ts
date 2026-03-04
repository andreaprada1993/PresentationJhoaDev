// --- Shared Types ---

export interface ISkill {
    id?: string;
    name: string;
    level: number;
}

export interface IFeature {
    id?: string;
    title: string;
    description: string;
    icon: JSX.Element;
}

export interface IProject {
    id?: string;
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
