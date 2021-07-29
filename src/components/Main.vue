<template>
  <div class="container">
    <language-switcher></language-switcher>
    <setting-button></setting-button>
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
    <ui-tab-bar v-model="state.active" @update:modelValue="handleTabChange">
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
          :key="tab.key"
      >
        <ui-textfield
            v-model="state.result[tab.key]"
            disabled
            input-type="textarea"
            outlined
            fullwidth
            rows="4"
            placeholder="译文"
        >
        </ui-textfield>
      </ui-panel>
    </ui-panels>
  </div>
</template>

<script setup>
import {onMounted, reactive, watch} from 'vue'
import {debounce} from 'lodash'
import SettingButton from './SettingButton.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const tabs = [
  {
    key: 'google',
    title: '谷歌翻译',
  },
  {
    key: 'bing',
    title: '必应翻译',
  },
  {
    key: 'youdao',
    title: '有道翻译',
  }
]

const state = reactive({
  active: 0,
  content: "",
  result: tabs.map(v => {
    return {[v.key]: ""}
  }),
})

// todo:: debounce timeout setting and locking request for every provider
watch(() => state.content, debounce((content, prevContent) => {
  updateTranslate(content)
}, 500))

function updateTranslate(content) {
  const currTabKey = tabs[state.active].key
  if (content.length) {
    state.result[currTabKey] = 'loading...'
    setTimeout(() => {
      if (content === state.content) {
        // avoid translate result doesn't match with origin content
        state.result[currTabKey] = content + '在' + currTabKey + '中的翻译结果'
      }
    }, 1000)
  } else {
    state.result[currTabKey] = ''
  }
}

function handleTabChange(active) {
  updateTranslate(state.content)
}

onMounted(() => {
  // todo:: auto focus
})
</script>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
}

.container > * {
  margin-top: 10px;
}
</style>
