import type Statistic from "./Statistic";

enum SkillFeature {
    Bonus = "bonus",
    CriticalSuccess = "criticalSuccess",
    CriticalSuccessMultiplier = "criticalMultiplier",
    CriticalFailure = 'criticalFailure',
    Damage = "damage",
    DamageType = "damageType",
    Description = "description",
    Heal = "heal",
    Mana = "mana",
    Range = "range",
    Statistic = "statistic",
    Targets = "targets",
    Type = "type"
}

type SkillUpdate = {
    feature: SkillFeature,
    value: number | string
}

type StatBonus = {
    statistic: Statistic,
    value: number
}

type UnlockedSkill = {
    name: string,
    level: number   
}

export default interface SkillLevel {
    level: number,
    skills: Array<UnlockedSkill> | undefined,
    statistics: Array<StatBonus> | undefined
    update: Array<SkillUpdate> | undefined,
    unlockAtTimesUsed: number | undefined
}