import type Skill from "./Skill";

export default interface CharacterSkill {
    skill: Skill | string,
    level: number,
    timesUsed?: number
}