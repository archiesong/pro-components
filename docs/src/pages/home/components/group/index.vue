<script setup lang="ts">
import { theme } from 'antdv-next'

const props = defineProps<{
  id?: string
  title?: string
  titleColor?: string
  description?: string
  background?: string
  collapse?: boolean
  backgroundPrefetchList?: string[]
}>()

const { token } = theme.useToken()
</script>

<template>
  <div
    class="antdv-home-group-container"
    :style="props.background?.startsWith('https')
      ? { backgroundImage: `url(${props.background})` }
      : { backgroundColor: props.background }"
  >
    <div class="antdv-home-group-decoration-container">
      <slot name="decoration" />
    </div>

    <div
      class="antdv-home-group-mask-layer"
      :style="{ paddingBlock: `${token?.marginSM ?? 80}px` }"
    >
      <div class="antdv-home-group-typography-wrapper text-center">
        <a-typography-title
          :id="id"
          :level="1"
          :style="{
            fontWeight: 900,
            color: titleColor,
            margin: 0,
            fontSize: `${token?.fontSizeHeading1}px`,
          }"
        >
          {{ title }}
        </a-typography-title>
        <a-typography-paragraph
          :style="{
            color: titleColor,
            marginBottom: `${token?.marginXS ?? 48}px`,
          }"
        >
          {{ description }}
        </a-typography-paragraph>
      </div>

      <div :class="{ 'antdv-home-group-margin-style': !collapse }">
        <div v-if="$slots.default">
          <slot />
        </div>
        <div v-else class="antdv-home-group-without-children" />
      </div>
    </div>
  </div>
</template>

<style>
.antdv-home-group-container {
  position: relative;
  transition: all var(--ant-motion-duration-slow);
  background-size: cover;
  background-position: 50% 0%;
  background-repeat: no-repeat;
}

.antdv-home-group-decoration-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.antdv-home-group-mask-layer {
  z-index: 1;
  position: relative;
}

.antdv-home-group-typography-wrapper {
  text-align: center;
}

.antdv-home-group-margin-style {
  max-width: 1208px;
  margin-inline: auto;
  box-sizing: border-box;
  padding-inline: var(--ant-margin-xxl);
}

.antdv-home-group-without-children {
  min-height: 300px;
  border-radius: var(--ant-border-radius-lg);
  background-color: #e9e9e9;
}
</style>
