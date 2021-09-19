<template>
 <div class="flex justify-center items-center h-screen w-screen flex-col bg-gradient-to-tr from-red-400 via-blue-300 to-purple-400">
    <div class="settings w-5/6 max-w-lg bg-white p-5 rounded bg-opacity-60">
      <h1 class="font-extralight text-3xl text-center mb-1 text-gray-800">Settings</h1>
      <hr class="block h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent w-full">
      <div class="section danger p-4 rounded-lg my-4 w-full border-red-400 border-2 flex flex-col">
        <h2 class="font-semibold text-xl text-red-700">Danger zone</h2>
        <i class="font-light text-gray-800 mb-2">These buttons just email support, feel free to click.</i>
        <div class="buttons flex w-full">
          <a href="mailto:support@ejenda.org?subject=I%20would%20like%20to%20delete%20my%20Ejenda%20account&body=My%20username%20is%20%5Byour_username%5D" class="mx-1 flex-1 p-2 border-red-600 hover:text-red-100 hover:bg-red-900 active:scale-95 border-2 rounded text-white bg-red-600 transition-all duration-300">
            Delete account
          </a>
          <a :href="`mailto:support@ejenda.org?subject=I%20would%20like%20to%20change%20my%20Ejenda%20username&body=${$auth.user.name}%20is%20%5Byour_username%5D%2C%20I%20would%20like%20to%20change%20it%20to%20%5Bnew_username%5D`" class="mx-1 flex-1 p-2 border-red-600 hover:text-red-100 hover:bg-red-900 active:scale-95 border-2 rounded text-white bg-red-600 transition-all duration-300">
            Change username
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
