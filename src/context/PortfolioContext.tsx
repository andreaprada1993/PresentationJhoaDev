import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ISkill, IFeature, IProject, IHeroStats } from '../types';
import { HERO_CONTENT, HERO_STATS, SKILLS_DATA, FEATURES_DATA, PROJECTS_DATA } from '../data/portfolio.data';

export interface IHeroContent {
    title: string;
    subtitle: string;
    badge: string;
    description: string;
}

interface PortfolioContextType {
    // State
    heroContent: IHeroContent;
    heroStats: IHeroStats[];
    skills: ISkill[];
    features: IFeature[];
    projects: IProject[];

    // Actions - Hero
    updateHeroContent: (content: IHeroContent) => void;
    // Actions - Projects
    addProject: (project: IProject) => void;
    updateProject: (index: number, project: IProject) => void;
    deleteProject: (index: number) => void;
    // Actions - Skills
    updateSkill: (index: number, skill: ISkill) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_cms_data';

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
    // Try to load from local storage first, fallback to static data
    const loadInitialState = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse portfolio data from storage', e);
            }
        }

        return {
            heroContent: HERO_CONTENT,
            heroStats: HERO_STATS,
            skills: SKILLS_DATA,
            features: FEATURES_DATA,
            projects: PROJECTS_DATA
        };
    };

    const [state, setState] = useState(loadInitialState);

    // Save to local storage whenever state changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const updateHeroContent = (content: IHeroContent) => {
        setState((prev: any) => ({ ...prev, heroContent: content }));
    };

    const addProject = (project: IProject) => {
        setState((prev: any) => ({ ...prev, projects: [...prev.projects, project] }));
    };

    const updateProject = (index: number, updatedProject: IProject) => {
        setState((prev: any) => {
            const newProjects = [...prev.projects];
            newProjects[index] = updatedProject;
            return { ...prev, projects: newProjects };
        });
    };

    const deleteProject = (index: number) => {
        setState((prev: any) => {
            const newProjects = [...prev.projects];
            newProjects.splice(index, 1);
            return { ...prev, projects: newProjects };
        });
    };

    const updateSkill = (index: number, updatedSkill: ISkill) => {
        setState((prev: any) => {
            const newSkills = [...prev.skills];
            newSkills[index] = updatedSkill;
            return { ...prev, skills: newSkills };
        });
    };

    return (
        <PortfolioContext.Provider value={{
            ...state,
            updateHeroContent,
            addProject,
            updateProject,
            deleteProject,
            updateSkill
        }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (context === undefined) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};
