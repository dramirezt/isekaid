import type CharacterCombatStats from './CharacterCombatStats'
import type CharacterResistances from './CharacterResistances'
import type CharacterStatistics from './CharacterStatistics'
import type CharacterSkill from './CharacterSkill'

export default interface CharacterClass {
    class: string,
    color: string,
    type: string,
    combat: CharacterCombatStats,
    resistances: CharacterResistances,
    statistics: CharacterStatistics
    skills: Array<CharacterSkill>
}