<script setup lang="ts">
import { watch } from 'vue';

interface Props {
    display: boolean
}

const props = withDefaults(defineProps<Props>(), {
    display: false
})

watch(
    () => props.display,
    (value) => {
        document.body.style.overflow = value ? 'hidden' : ''
    }
)

const emit = defineEmits(['close'])

function closeModal(): void {
    emit('close')
}
</script>

<template>
    <Transition name="fade">
        <div class="modal" v-if="display" @click="closeModal">
            <button type="button" class="btn-close">
                <img src="@/assets/icons/close.svg">
            </button>
            <div class="content" @click.stop>
                <slot name="content" />
            </div>
        </div>
    </Transition>
</template>

<style lang="scss">
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 0 20px;
    z-index: 999;

    .btn-close {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .content {
        max-width: 100%;
    }
}
</style>