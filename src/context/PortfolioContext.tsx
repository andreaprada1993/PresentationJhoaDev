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
    linkedin?: string;
    whatsapp?: string;
    stats?: IHeroStats[];
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
    addSkill: (skill: ISkill) => Promise<void>;
    updateSkill: (index: number, skill: ISkill) => Promise<void>;
    deleteSkill: (index: number) => Promise<void>;
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
                        history: profileData.history || '',
                        linkedin: profileData.linkedin || '',
                        whatsapp: profileData.whatsapp || '',
                        stats: profileData.stats || []
                    };

                    if (profileData.stats && profileData.stats.length > 0) {
                        newState.heroStats = profileData.stats;
                    }
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
                    history: content.history,
                    linkedin: content.linkedin,
                    whatsapp: content.whatsapp,
                    stats: content.stats
                }).eq('id', content.id);
                if (error) throw error;
            } else {
                // Insert (very first time)
                const { error } = await supabase.from('profile').insert([{
                    name: content.title,
                    role: content.subtitle,
                    description: content.description,
                    history: content.history,
                    linkedin: content.linkedin,
                    whatsapp: content.whatsapp,
                    stats: content.stats
                }]);
                if (error) throw error;
            }
            await fetchData();
        } catch (e: any) {
            console.error("Error updating hero content", e);
            throw new Error(e.message || "Error al actualizar la sección principal");
        }
    };

    const addProject = async (project: IProject) => {
        try {
            const hasDbProjects = state.projects.some(p => p.id);
            if (!hasDbProjects && state.projects.length > 0) {
                const newProjectsToInsert = state.projects.map(p => ({
                    title: p.title, description: p.description, imageurl: p.image,
                    tags: p.tags, live_url: p.liveUrl, github_url: p.githubUrl
                }));
                newProjectsToInsert.push({
                    title: project.title, description: project.description, imageurl: project.image,
                    tags: project.tags, live_url: project.liveUrl, github_url: project.githubUrl
                });
                const { error } = await supabase.from('projects').insert(newProjectsToInsert);
                if (error) throw error;
                await fetchData();
                return;
            }

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
        } catch (e: any) {
            console.error("Error adding project", e);
            throw new Error(e.message || "Error al guardar el proyecto");
        }
    };

    const updateProject = async (index: number, updatedProject: IProject) => {
        try {
            const projectToUpdate = state.projects[index];
            if (!projectToUpdate?.id) {
                const hasDbProjects = state.projects.some(p => p.id);
                if (!hasDbProjects && state.projects.length > 0) {
                    const newProjectsToInsert = state.projects.map((p, i) => {
                        const proj = i === index ? updatedProject : p;
                        return {
                            title: proj.title, description: proj.description, imageurl: proj.image,
                            tags: proj.tags, live_url: proj.liveUrl, github_url: proj.githubUrl
                        };
                    });
                    const { error } = await supabase.from('projects').insert(newProjectsToInsert);
                    if (error) throw error;
                    await fetchData();
                    return;
                }
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
        } catch (e: any) {
            console.error("Error updating project", e);
            throw new Error(e.message || "Error al actualizar el proyecto");
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
        } catch (e: any) {
            console.error("Error deleting project", e);
            throw new Error(e.message || "Error al eliminar el proyecto");
        }
    };

    const addSkill = async (skill: ISkill) => {
        try {
            const hasDbSkills = state.skills.some(s => s.id);
            if (!hasDbSkills && state.skills.length > 0) {
                const newSkillsToInsert = state.skills.map(s => ({ name: s.name, category: String(s.level) }));
                newSkillsToInsert.push({ name: skill.name, category: String(skill.level) });
                const { error } = await supabase.from('skills').insert(newSkillsToInsert);
                if (error) throw error;
                await fetchData();
                return;
            }

            const { error } = await supabase.from('skills').insert([{
                name: skill.name,
                category: String(skill.level)
            }]);
            if (error) throw error;
            await fetchData();
        } catch (e: any) {
            console.error("Error adding skill", e);
            throw new Error(e.message || "Error al guardar la habilidad");
        }
    };

    const updateSkill = async (index: number, updatedSkill: ISkill) => {
        try {
            const skillToUpdate = state.skills[index];
            if (!skillToUpdate?.id) {
                const hasDbSkills = state.skills.some(s => s.id);
                if (!hasDbSkills && state.skills.length > 0) {
                    const newSkillsToInsert = state.skills.map((s, i) => {
                        if (i === index) return { name: updatedSkill.name, category: String(updatedSkill.level) };
                        return { name: s.name, category: String(s.level) };
                    });
                    const { error } = await supabase.from('skills').insert(newSkillsToInsert);
                    if (error) throw error;
                    await fetchData();
                    return;
                }
            }

            const { error } = await supabase.from('skills').update({
                name: updatedSkill.name,
                category: String(updatedSkill.level)
            }).eq('id', skillToUpdate.id);

            if (error) throw error;
            await fetchData();
        } catch (e: any) {
            console.error("Error updating skill", e);
            throw new Error(e.message || "Error al actualizar la habilidad");
        }
    };

    const deleteSkill = async (index: number) => {
        try {
            const skillToDelete = state.skills[index];
            if (!skillToDelete?.id) {
                // If it doesn't have an ID, just remove it locally
                setState(prev => {
                    const newSkills = [...prev.skills];
                    newSkills.splice(index, 1);
                    return { ...prev, skills: newSkills };
                });
                return;
            }

            const { error } = await supabase.from('skills').delete().eq('id', skillToDelete.id);
            if (error) throw error;
            await fetchData();
        } catch (e: any) {
            console.error("Error deleting skill", e);
            throw new Error(e.message || "Error al eliminar la habilidad");
        }
    };

    return (
        <PortfolioContext.Provider value={{
            ...state,
            isLoading,
            updateHeroContent,
            addProject,
            updateProject,
            deleteProject,
            addSkill,
            updateSkill,
            deleteSkill
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
