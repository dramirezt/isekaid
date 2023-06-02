<script setup lang="ts">
import { computed, onMounted, onUnmounted, onUpdated, ref, reactive } from 'vue'
import type Character from '@/types/Character'
import getStatValue from '@/composables/GetStatValue';
import Statistic from '@/types/Statistic';

interface Props {
    character: Character,
    type: "health" | "mana",
    icon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    icon: true
})

const statistic = props.type == 'health' ? Statistic.Constitution : Statistic.Mana

const state = reactive({
    current: computed((): number => {
        const current = props.character.combat[props.type].current

        return current ? current: 0
    }),
    total: computed((): number => {
        let value = props.character.combat[props.type].base
        value += getStatValue(props.character.statistics, statistic)

        const bonus = props.character.combat[props.type].bonus

        if (bonus) {
            value += bonus
        }

        return value
    })
})

const progress = ref()
const progressTimeout = ref()

function setProgressWidth(): void {
    progressTimeout.value = setTimeout(() => {
        progress.value.style.width = ((state.current / state.total) * 100) + '%'
    }, 300)
}

onUnmounted(() => {
    clearTimeout(progressTimeout.value)
})

onUpdated(() => {
    setProgressWidth()
})

onMounted(() => {
    setProgressWidth()
})


</script>

<template>
    <div class="character-status-bar" :class="[type]">
        <img :src="'/src/assets/icons/combat/' + type + '.png'" class="icon--small" v-if="icon">
        <div class="bar">
            <span class="progress" ref="progress" />
        </div>
    </div>
</template>

<style lang="scss">
.character-status-bar {
    display: flex;
    align-items: center;
    width: 100%;

    &.mana {
        .bar {
            border-color: #8BB7F0;
            background-color: rgba(#8BB7F0, 0.16);

            .progress {
                background-color: #8BB7F0;
            }
        }
    }

    &.health {
        .bar {
            border-color: #FF5B5B;
            background-color: rgba(#FF5B5B, 0.16);

            .progress {
                background-color: #FF5B5B;
            }
        }
    }

    .icon--small {
        margin-right: 10px;
        width: 20px;
        height: 20px;
    }

    .bar {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        border: 1px solid #fff;
        border-radius: 12px;
        height: 15px;
        width: 100%;
        background-color: rgba(#fff, 0.16);
        overflow: hidden;

        .progress {
            height: 13px;
            width: 0;
            background-color: #fff;
            display: inline-block;
            border-radius: 12px;
            transition: all 0.6s ease-in-out;
        }
    }
}
</style>