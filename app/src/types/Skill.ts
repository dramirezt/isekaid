import type DamageType from "./DamageType";
import type SkillLevel from "./SkillLevel";
import type SkillType from "./SkillType";
import type Statistic from "./Statistic";

interface BaseSkill {
    bonus: number | undefined,
    criticalSuccess: number | undefined,
    criticalSuccessMultiplier: number | undefined,
    criticalFailure: number | undefined,
    description: string | undefined,
    evolutions: Array<Skill> | undefined,
    levels: Array<SkillLevel> | undefined,
    name: string,
    mana: number | undefined,
    range: number | undefined,
    statistic: Statistic | undefined,
    targets: number | undefined
}

interface Action extends BaseSkill { 
    type: SkillType.Action | SkillType.Free 
}

interface Attack extends BaseSkill {
    damage: number,
    damageType: DamageType,
    type: SkillType.Attack | SkillType.Free
}

interface Heal extends BaseSkill {
    heal: number,
    type: SkillType.Heal | SkillType.Free
}

interface Passive extends BaseSkill {
    type: SkillType.Passive
}

interface Shield extends BaseSkill {
    shield: number,
    type: SkillType.Shield | SkillType.Free
}

interface Unique extends BaseSkill {
    type: SkillType.Unique
}

type Skill = Action | Attack | Heal | Passive | Shield

export default Skill
