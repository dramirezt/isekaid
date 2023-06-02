<script setup lang="ts">
import type Character from '@/types/Character'
import getSpeedValue from '@/composables/GetSpeedValue'
import CharacterRoundIcon from './CharacterRoundIcon.vue'
import CharacterStatusBar from './CharacterStatusBar.vue'

defineProps<{
    character: Character
}>()
</script>

<template>
    <div class="panel">
        <!--<div class="panel-title">
            <div>
                {{ character.class }}
            </div>
        </div>-->
        <div class="panel-content">
            <div class="character-status">
                <CharacterRoundIcon :character="character" :size="'xlarge'" />
                <div class="character-bars">
                    <CharacterStatusBar :character="character" :type="'health'" />
                    <CharacterStatusBar :character="character" :type="'mana'" />
                </div>
            </div>
            <!--<div class="character-speed">
                <img src="@/assets/icons/combat/speed.png" class="icon--small" />
                {{ getSpeedValue(character.combat.speed) }} casillas
            </div>-->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.character-speed {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #fff;
    align-self: flex-end;

    img {
        margin-right: 5px;
    }
}

.panel-content {
    padding: 0 20px;

    .character-status {
        display: flex;
        align-items: center;
        width: 100%;
        .character-round-icon {
            margin-right: 20px;
        }
    
        .character-bars {
            width: calc(100% - 70px);

            > div:not(:last-child) {
                margin-bottom: 5px;
            }
        }
    }
}
</style>