import 'docsearch.js/dist/cdn/docsearch.css';
import './index.less';
import 'nprogress/nprogress.css';
import { createApp, Transition, TransitionGroup } from 'vue';
import i18n from './locales';
import NProgress from 'nprogress';
import router from './router';
import Antd from 'ant-design-vue';
import demoBox from './components/DemoBox.vue';
import demoContainer from './components/demoContainer.vue';
import demoSort from './components/demoSort';
import clipboard from './directives/clipboard';
import App from './App.vue';
const app = createApp(App);

app.use(Antd);
app.use(clipboard);
app.component('Transition', Transition);
app.component('TransitionGroup', TransitionGroup);
app.component('DemoBox', demoBox);
app.component('DemoContainer', demoContainer);
app.component('DemoSort', demoSort);

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  if (to.path !== from.path) {
    NProgress.done();
    document.documentElement.scrollTop = 0;
  }
});

app.use(router);
app.use(i18n);

app.mount('#app');
