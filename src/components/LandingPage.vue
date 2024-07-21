<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <RouterLink to="/portfolioHome">Portfolio</RouterLink>
    Select this link to see your accounts
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <RouterLink to="/watchList">Watch List</RouterLink>
    Select to choose a watch ist to view
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <RouterLink to="/createWatchList">Create Watch List</RouterLink>
    Select to create a new watch list
  </WelcomeItem>
</template>

<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
</script>
