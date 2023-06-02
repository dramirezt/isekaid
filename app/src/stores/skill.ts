import { defineStore } from 'pinia'
import type Skill from '@/types/Skill'

export const useSkillStore = defineStore('skills', {
    state: () => ({
        skills: [] as Array<Skill>
    }),
    getters: {
        getSkillBySlug(state) {
            return (slug: string) => state.skills.find((s: Skill) => {
                return s.name == slug
            })
        }
    },
    actions: {
        fetchSkills() {
            fetch('/skills.json')
            .then((response) => response.json())
            .then((data) => { 
                this.skills = data
            })
            .catch(error => { console.error(error) })
        }
    }
})