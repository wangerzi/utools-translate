<template>
  <div class="switcher-container">
    <ui-select
        v-model="state.from"
        :class="{'language-selector': true, 'left-switching': true, 'switching': state.switching}"
        :options="LANGUAGES"
        outlined
        mini
    >原始语言</ui-select>
    <ui-fab icon="published_with_changes" class="" @click="handleChange" mini></ui-fab>
    <ui-select
        v-model="state.to"
        :class="{'language-selector': true, 'right-switching': true, 'switching': state.switching}"
        :options="LANGUAGES"
        outlined
        mini
    >目标语言</ui-select>
  </div>
</template>

<script setup>
import {reactive} from 'vue'

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
  switching: false,
});

function handleChange() {
  if (state.switching) {
    return false;
  }

  state.switching = true;

  // 先改数据比较合适，不然动画看起来就是迟滞的
  const t = state.from;
  state.from = state.to;
  state.to = t;

  setTimeout(() => {
    state.switching = false
  }, 1000)
}
</script>

<style>
.switcher-container .mdc-select--outlined .mdc-select__anchor {
  width: 120px;
  height: 40px;
}
.switcher-container .mdc-select .mdc-floating-label {
  top: 75%;
}
</style>
<style scoped>
.switcher-container {
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  position: relative;
}
@keyframes rightSwitch {
  0% {
    left: 0;
    opacity: 1;
  }
  50% {
    left: -50px;
    opacity: 0;
  }
  100% {
    left: 0;
    opacity: 1;
  }
}
@keyframes leftSwitch {
  0% {
    left: 0;
    opacity: 1;
  }
  50% {
    left: 50px;
    opacity: 0;
  }
  100% {
    left: 0;
    opacity: 1;
  }
}
.language-selector {
  width: 40%;
}
.left-switching.switching {
  animation: leftSwitch 1s;
}
.right-switching.switching {
  animation: rightSwitch 1s;
}
</style>
