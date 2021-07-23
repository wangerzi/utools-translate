<template>
  <div class="switcher-container">
    <ui-select
        v-model="state.from"
        class="language-selector"
        :options="LANGUAGES"
        outlined
    >原始语言</ui-select>
    <ui-fab icon="published_with_changes" class=""></ui-fab>
    <ui-select
        v-model="state.to"
        class="language-selector"
        :options="LANGUAGES"
        outlined
    >目标语言</ui-select>
  </div>
</template>

<script setup>
import {reactive, computed} from 'vue';

const LANGUAGES = [
  {
    label: "中文",
    value: 'cn'
  },
  {
    label: "英语",
    value: 'en'
  },
  {
    label: "日语",
    value: 'jp'
  }
];

const state = reactive({
  from: 'cn',
  to: 'en',
});
</script>

<style scoped>
.switcher-container {
  display: flex;
  flex-direction: row;

  justify-content: space-between;
}
.language-selector {
  width: 40%;
}
</style>