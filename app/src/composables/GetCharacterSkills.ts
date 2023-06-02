import { useSkillStore } from "@/stores/skill"
import type CharacterSkill from "@/types/CharacterSkill"
import type Character from "@/types/Character"
import type Skill from "@/types/Skill"
import SkillType from "@/types/SkillType"

const skillStore = useSkillStore()

function parseSkill(s: CharacterSkill): CharacterSkill {
    return {
        skill: skillStore.getSkillBySlug(s.skill as string) as Skill,
        level: s.level
    }
}

function parseCharacterSkills(character: Character): Array<CharacterSkill> {
    let skills: Array<CharacterSkill> = []

    character?.skills.forEach(s => {
        skills.push(parseSkill(s))
    })

    return skills
}

function getCharacterSkills(character: Character | undefined, type: "active" | "passive"): Array<CharacterSkill> {
    if (!character) {
        return []
    }

    return parseCharacterSkills(character).filter((s: CharacterSkill) => {
        const skill = s.skill as Skill
        if (type == 'active') {
            return skill.type !== SkillType.Passive
        }
        else {
            return skill.type == SkillType.Passive
        }
    })
}

export default getCharacterSkills