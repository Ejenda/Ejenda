import Vue from "vue";
import { vfmPlugin } from "vue-final-modal/lib";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

Vue.component("v-select", vSelect);

Vue.use(vfmPlugin);
