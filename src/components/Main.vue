<template>
  <div class="container">
    <ui-textfield
        v-model="state.content"
        input-type="textarea"
        outlined
        fullwidth
        :maxlength="2000"
        with-counter
        rows="6"
    >
      原文
    </ui-textfield>
    <div class="middle-toolbar">
      <ui-tab-bar v-model="state.active" @update:modelValue="handleTabChange" class="translate-tabs">
        <ui-tab
            v-for="(tab, index) in tabs"
            :key="index"
        >
          {{ tab.title }}
        </ui-tab>
      </ui-tab-bar>
      <div class="operation">
        <language-switcher ref="switcher"></language-switcher>
        <setting-button></setting-button>
      </div>
    </div>
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
            rows="6"
            placeholder="译文"
        >
        </ui-textfield>
      </ui-panel>
    </ui-panels>
    <copy-button></copy-button>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, watch, onUnmounted} from 'vue'
import {debounce, throttle} from 'lodash'
import SettingButton from './SettingButton.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import CopyButton from './CopyButton.vue'

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

const resultContent = computed(() => {
  const currTabKey = tabs[state.active].key
  return state.result[currTabKey]
})

const listenerKeyboard = debounce((e) => {
  if (e.key === 'c' && (window.utools.isMacOs() ? e.metaKey : e.ctrlKey)){
    e.preventDefault();
    console.log("copy", resultContent.value);
    utools.copyText(resultContent.value);
    utools.hideMainWindow();
  }
}, 200)
onMounted(() => {
  // todo:: auto focus
  document.addEventListener('keydown', listenerKeyboard);
})
onUnmounted(() => {
  document.removeEventListener('keydown', listenerKeyboard)
})
</script>

<!--<style>-->
<!--.middle-toolbar .mdc-fab&#45;&#45;mini {-->
<!--  width: 30px;-->
<!--  height: 30px;-->
<!--}-->
<!--</style>-->
<style scoped>
.container {
  width: 90%;
  margin: 10px auto;

  display: flex;
  flex-direction: column;
}

.container > * {
  margin-top: 5px;
}

.middle-toolbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}
.operation {
  width: 50%;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.translate-tabs {
  max-width: 45%;
  /*background-color: #fafafa;*/
}
</style>
