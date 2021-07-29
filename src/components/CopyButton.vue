<template>
  <ui-button icon="content_copy" outlined class="copy-button">{{copyText}}</ui-button>
</template>

<script setup>
const copyText = "复制（"+(window.utools.isMacOs() ? '⌘' : 'Ctrl')+" + C）"
</script>

<style scoped>
.copy-button {
  width: 200px;
  margin: 0 auto;
}
.copy-button .mdc-button--outlined:disabled, .mdc-button--outlined:not(:disabled) {
  color: #ff6f00;
  border-color: #ff6f00;
}
</style>
