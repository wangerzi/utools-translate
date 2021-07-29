import { createApp } from 'vue'
import App from './App.vue'

import UiTabs from 'balm-ui/components/tabs';
import UiButton from 'balm-ui/components/button';
import UiText from 'balm-ui/components/textfield';
import UiSelect from 'balm-ui/components/select';
import UiFab from 'balm-ui/components/fab';
// import UiGridComponents from 'balm-ui/components/grid';
// import $grid from 'balm-ui/plugins/grid'; // Optional

import $theme from 'balm-ui/plugins/theme';

import 'balm-ui/components/core.css';
import 'balm-ui/components/button/button.css';
import 'balm-ui/components/tabs/tabs.css';
import 'balm-ui/components/textfield/textfield.css';
// select
import 'balm-ui/components/select/select.css';
import 'balm-ui/components/menu/menu.css';
import 'balm-ui/components/list/list.css';

// fab
import 'balm-ui/components/fab/fab.css'
import 'balm-ui/components/icon/icon.css'

// fix color problems
import "./fix-color.css"

const app = createApp(App)

app.use(UiTabs)
app.use(UiText)
app.use(UiButton)
app.use(UiSelect)
app.use(UiFab)
// app.use(UiGridComponents).use($grid)

app.use($theme, {
  "background": "#fff",
  "primary": "#ff6f00",
  "on-primary": "#000",
  "secondary": "#FFC020",
  "on-secondary": "#000",
  "surface": "#fff",
  "on-surface": "#000",
  "error": "#b00020",
  "on-error": "#fff",
})

app.mount('#app')
