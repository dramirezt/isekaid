<script setup lang="ts">
type View = {
    slug: string,
    text: string
}

defineProps<{
    views: Array<View>,
    currentView: string
}>()

defineEmits(['update-view'])
</script>

<template>
    <div class="view-selector">
        <button v-for="view in views" :view="view" :current-view="currentView" type="button"
            :class="{ 'active': view.slug == currentView }" @click="$emit('update-view', { data: view.slug })">
            {{ view.text }}
        </button>
    </div>
</template>