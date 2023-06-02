import type CombatStatType from "./CombatStatType";
import type Statistic from "./Statistic";

type Combat = {
    [key in CombatStatType]: {
        base: number,
        bonus: number | undefined
        current: number | undefined,
        statistic: Statistic,
        temporalModifier: number,
    }
}

export default interface CharacterCombatStats extends Combat {}