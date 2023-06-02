import { defineStore } from 'pinia'
import type Character from '@/types/Character'

export const useCharacterStore = defineStore('characters', {
    state: () => ({
        characters: [] as Array<Character>,
        currentCharacter: undefined as Character | undefined
    }),
    actions: {
        fetchCharacters() {
            fetch('/characters.json')
            .then((response) => response.json())
            .then((data) => { 
                this.characters = data
            })
            .catch(error => { console.error(error) })
        }
    }
})