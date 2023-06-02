import type DamageType from "./DamageType"
import type ResistanceType from "./ResitanceType"
import type Statistic from "./Statistic"

type Resistances = {
    [key in DamageType]: {
        base: number
        bonus: number | undefined,
        statistic: Statistic,
        temporalModifier: number | undefined,
        type: ResistanceType,
    }
}

export default interface CharacterResistances extends Resistances {}