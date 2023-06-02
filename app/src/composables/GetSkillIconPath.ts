import type Skill from "@/types/Skill";
import SkillType from "@/types/SkillType";

export default function getSkillIconPath(skill: Skill | undefined) {
    let path = '/src/assets/icons/'

    if (skill) {
        if (skill.type == SkillType.Attack) {
            path += 'damage_types/' + skill.damageType + '.png'
        }
        else {
            path += 'skills/' + skill.type + '.png'
        }
    }

    return path
}