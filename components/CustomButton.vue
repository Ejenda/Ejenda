<template>
  <button
    type="submit"
    class="
      disabled:bg-gray-100 disabled:cursor-default
      bg-red-500
      text-white text-center
      font-bold
      p-2
      h-10
      rounded-lg
      cursor-pointer
    "
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </button>
</template>
