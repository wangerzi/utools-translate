<template>
  <div class="container">
    <language-switcher></language-switcher>
    <ui-textfield
        v-model="state.content"
        input-type="textarea"
        outlined
        fullwidth
        :maxlength="2000"
        with-counter
        rows="4"
    >
      原文
    </ui-textfield>
    <ui-tab-bar v-model="state.active">
      <ui-tab
          v-for="(tab, index) in tabs"
          :key="index"
      >
        {{ tab.title }}
      </ui-tab>
    </ui-tab-bar>
    <ui-panels v-model="state.active">
      <ui-panel
          v-for="(tab, index) in tabs"
          :key="index"
      >
        <ui-textfield
            v-model="state.result"
            disabled
            input-type="textarea"
            fullwidth
            rows="4"
        >
          译文
        </ui-textfield>
      </ui-panel>
    </ui-panels>
  </div>
</template>

<script setup>
import {reactive, onMounted} from 'vue'

const tabs = [
  {
    title: '谷歌翻译',
  },
  {
    title: '必应翻译',
  },
  {
    title: '有道翻译',
  }
]

const state = reactive({
  active: 0,
  content: "",
  result: "",
})

onMounted(() => {
})
</script>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
}

.container > * {
  margin-top: 20px;
}
</style>
