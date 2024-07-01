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
    Select This To See Companies You're Interest In Learning More About
  </WelcomeItem>
</template>

<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
</script>
