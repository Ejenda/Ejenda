import Vue from "vue";
import calendar from "v-calendar";
import VueTailwind from "vue-tailwind";
import { TRichSelect } from "vue-tailwind/dist/components";

const components = {
  'TRichSelect': {
    component: TRichSelect,
    }
  
}

Vue.use(VueTailwind, components);

Vue.use(calendar);
import VueSkeletonLoader from "skeleton-loader-vue";

// Register the component globally
Vue.use(VueSkeletonLoader);
