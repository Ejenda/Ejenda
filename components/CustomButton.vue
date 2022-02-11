<template>
  <button
    type="submit"
    class="h-10 cursor-pointer rounded-lg bg-red-500 p-2 text-center font-bold text-white disabled:cursor-default disabled:bg-gray-100"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </button>
</template>
