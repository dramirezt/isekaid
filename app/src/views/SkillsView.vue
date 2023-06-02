<script setup lang="ts">
import { reactive } from 'vue'
import type Skill from '@/types/Skill'
import Modal from '@/components/Modal.vue'
import SkillButton from '@/components/SkillButton.vue'
import SkillCard from '@/components/SkillCard.vue'
import { useSkillStore } from '@/stores/skill'

const skillStore = useSkillStore()

const state = reactive({
  skillToDisplay: <Skill>({})
})

type SkillButtonEvent = {
  skill: Skill,
  castable: boolean
}

function useSkill(data: SkillButtonEvent): void {
  console.log('click')
  if (data) {
    if (data.castable) {
      console.log('casteando ' + data.skill.name)
    }
    else {
      console.log('la habilidad ' + data.skill.name + ' no es usable')
    }
  }
}

function displaySkillCard(data: SkillButtonEvent): void {
  if (data) {
    state.skillToDisplay = data.skill
  }
}
</script>

<template>
  <main>
    <Modal @close="state.skillToDisplay = <Skill>({})" :display="Object.keys(state.skillToDisplay).length > 0">
      <template v-slot:content>
        <SkillCard :skill="state.skillToDisplay" />
      </template>
    </Modal>
    <SkillButton v-for="skill in skillStore.skills" :skill="skill" @click="useSkill($event.data)"
      @hold="displaySkillCard($event.data)" />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: grid;
  margin: 0 auto;
  max-width: 360px;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(116px, auto);
}
</style>