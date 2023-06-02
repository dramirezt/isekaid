<script setup lang="ts">
import { computed } from 'vue'
import type CharacterResistances from '@/types/CharacterResistances'
import ResistanceThreshold from '@/types/ResistanceThreshold'

const props = defineProps<{
    resistances: CharacterResistances,
    threshold: ResistanceThreshold
}>()

function getResistanceValue(res: string) {
    const key = res as keyof typeof props.resistances
    const bonus = props.resistances[key].bonus
    const temp = props.resistances[key].temporalModifier
    let value = props.resistances[key].base

    if (bonus) {
        value += bonus
    }
    if (temp) {
        value += temp
    }

    return value
}

type ResData = {
    damageType: string, 
    level: number
}

const resistances = computed((): Array<ResData> => {
    const res: Array<ResData> = []
    let filtered: Array<string> = []
    if (props.threshold == ResistanceThreshold.Resistances) {
        filtered = Object.keys(props.resistances).filter(r => {
            const value = getResistanceValue(r)
            return value > 0
            //return value > 0 && value < 100
        })
    }
    else if (props.threshold == ResistanceThreshold.Weakness) {
        filtered = Object.keys(props.resistances).filter(r => {
            const value = getResistanceValue(r)
            return value < 0
        })
    }

    filtered.forEach(f => {
        const resValue = getResistanceValue(f)
        const totalSigns = Math.abs(Math.round(resValue / 20))
        
        res.push({ damageType: f, level: totalSigns })
    })

    res.sort((a, b) => {
        return a.level > b.level ? -1 : 1
    })

    return res
})

</script>

<template>
    <div class="panel" v-if="resistances.length">
        <div class="panel-title">
            {{ threshold }}
        </div>
        <div class="panel-content">
            <div class="resistances">
                <div class="resistance" v-for="res in resistances">
                    <img :src="'/src/assets/icons/damage_types/' + res.damageType + '.png'" class="icon--medium">
                    <div class="resistance-level">
                        <img src="@/assets/icons/star.svg" v-for="i in res.level" class="icon--xsmall" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.resistances {
    display: flex;
    justify-content: center;
    width: 100%;
    grid-gap: 20px;
    grid-template-columns: repeat(3, auto);
    flex-wrap: wrap;

    .resistance {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-basis: 80px;

        .resistance-level {
            display: flex;
            margin-top: 5px;
        }
    }
}
</style>