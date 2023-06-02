import type Statistic from "./Statistic"

type Stats = {
    [key in Statistic]: {
        base: number,
        bonus: number | undefined
    }
}

export default interface CharacterStatistics extends Stats {}