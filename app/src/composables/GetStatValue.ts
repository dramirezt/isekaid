import type CharacterStatistics from "@/types/CharacterStatistics"
import type Statistic from "@/types/Statistic"

export default function getStatValue(statistics: CharacterStatistics, stat: Statistic): number {
    let value = statistics[stat].base
    const bonus = statistics[stat].bonus

    if (bonus) {
        value += bonus
    }

    return value
}