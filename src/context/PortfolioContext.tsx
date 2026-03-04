import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ISkill, IFeature, IProject, IHeroStats } from '../types';
import { HERO_CONTENT, HERO_STATS, SKILLS_DATA, FEATURES_DATA, PROJECTS_DATA } from '../data/portfolio.data';
import { supabase } from '../lib/supabase';

export interface IHeroContent {
    id?: string;
    title: string;
    subtitle: string;
    badge: string;
    description: string;
    history?: string;
}

interface PortfolioContextType {
    // State
    heroContent: IHeroContent;
    heroStats: IHeroStats[];
    skills: ISkill[];
    features: IFeature[];
    projects: IProject[];
    isLoading: boolean;

    // Actions - Hero
    updateHeroContent: (content: IHeroContent) => Promise<void>;
    // Actions - Projects
    addProject: (project: IProject) => Promise<void>;
    updateProject: (index: number, project: IProject) => Promise<void>;
    deleteProject: (index: number) => Promise<void>;
    // Actions - Skills
    updateSkill: (index: number, skill: ISkill) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<{
        heroContent: IHeroContent;
        heroStats: IHeroStats[];
        skills: ISkill[];
        features: IFeature[];
        projects: IProject[];
    }>({
        heroContent: { ...HERO_CONTENT, history: '' },
        heroStats: HERO_STATS,
        skills: SKILLS_DATA,
        features: FEATURES_DATA,
        projects: PROJECTS_DATA
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            // Fetch projects
            const { data: projectsData, error: projectsError } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
            if (projectsError) console.error(projectsError);

            // Fetch profile
            const { data: profileData, error: profileError } = await supabase.from('profile').select('*').limit(1).single();
            if (profileError && profileError.code !== 'PGRST116') console.error(profileError);

            // Fetch skills
            const { data: skillsData, error: skillsError } = await supabase.from('skills').select('*');
            if (skillsError) console.error(skillsError);

            setState(prev => {
                const newState = { ...prev };

                if (projectsData && projectsData.length > 0) {
                    newState.projects = projectsData.map((p: any) => ({
                        id: p.id,
                        title: p.title,
                        description: p.description,
                        image: p.imageurl,
                        tags: p.tags || [],
                        liveUrl: p.live_url || '',
                        githubUrl: p.github_url || ''
                    }));
                }

                if (profileData) {
                    newState.heroContent = {
                        id: String(profileData.id),
                        title: profileData.name,
                        subtitle: profileData.role,
                        badge: 'Open to work',
                        description: profileData.description,
                        history: profileData.history || ''
                    };
                }

                if (skillsData && skillsData.length > 0) {
                    newState.skills = skillsData.map((s: any) => ({
                        id: s.id,
                        name: s.name,
                        level: parseInt(s.category) || 80
                    }));
                }

                return newState;
            });
        } catch (error) {
            console.error('Error in Supabase fetch:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateHeroContent = async (content: IHeroContent) => {
        try {
            if (content.id) {
                // Update
                const { error } = await supabase.from('profile').update({
                    name: content.title,
                    role: content.subtitle,
                    description: content.description,
                    history: content.history
                }).eq('id', content.id);
                if (error) throw error;
            } else {
                // Insert (very first time)
                const { error } = await supabase.from('profile').insert([{
                    name: content.title,
                    role: content.subtitle,
                    description: content.description,
                    history: content.history
                }]);
                if (error) throw error;
            }
            await fetchData();
        } catch (e) {
            console.error("Error updating hero content", e);
            alert("Error al actualizar la información del perfil");
        }
    };

    const addProject = async (project: IProject) => {
        try {
            const { error } = await supabase.from('projects').insert([{
                title: project.title,
                description: project.description,
                imageurl: project.image,
                tags: project.tags,
                live_url: project.liveUrl,
                github_url: project.githubUrl
            }]);
            if (error) throw error;
            await fetchData();
        } catch (e) {
            console.error("Error adding project", e);
            alert("Error al guardar el proyecto");
        }
    };

    const updateProject = async (index: number, updatedProject: IProject) => {
        try {
            const projectToUpdate = state.projects[index];
            if (!projectToUpdate?.id) {
                // fallback to local if id doesn't exist
                setState(prev => {
                    const newProjects = [...prev.projects];
                    newProjects[index] = updatedProject;
                    return { ...prev, projects: newProjects };
                });
                return;
            }

            const { error } = await supabase.from('projects').update({
                title: updatedProject.title,
                description: updatedProject.description,
                imageurl: updatedProject.image,
                tags: updatedProject.tags,
                live_url: updatedProject.liveUrl,
                github_url: updatedProject.githubUrl
            }).eq('id', projectToUpdate.id);

            if (error) throw error;
            await fetchData();
        } catch (e) {
            console.error("Error updating project", e);
            alert("Error al actualizar el proyecto");
        }
    };

    const deleteProject = async (index: number) => {
        try {
            const projectToDelete = state.projects[index];
            if (!projectToDelete?.id) {
                // fallback to local state removal if no id
                setState(prev => {
                    const newProjects = [...prev.projects];
                    newProjects.splice(index, 1);
                    return { ...prev, projects: newProjects };
                });
                return;
            }

            const { error } = await supabase.from('projects').delete().eq('id', projectToDelete.id);
            if (error) throw error;
            await fetchData();
        } catch (e) {
            console.error("Error deleting project", e);
            alert("Error al eliminar el proyecto");
        }
    };

    const updateSkill = async (index: number, updatedSkill: ISkill) => {
        setState(prev => {
            const newSkills = [...prev.skills];
            newSkills[index] = updatedSkill;
            return { ...prev, skills: newSkills };
        });
    };

    return (
        <PortfolioContext.Provider value={{
            ...state,
            isLoading,
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
