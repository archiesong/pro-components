<template>
  <li
    v-clipboard:copy="text"
    v-clipboard:success="onCopied"
    :class="justCopied === type ? 'copied' : ''"
  >
    <component :is="allIcons[name]"></component>
    <span class="anticon-class">
      <Badge :dot="isNew">
        {{ kebabCasedType }}
      </Badge>
    </span>
  </li>
</template>
<script lang="ts" setup>
import * as AntdIcons from '@ant-design/icons-vue';
import { Badge } from 'ant-design-vue';
import { defineProps, defineEmits, ref } from 'vue';

const allIcons = ref(AntdIcons);

const kebabCase = function kebabCase(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
};
const props = defineProps({
 name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  isNew: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: 'filled',
  },
  justCopied: {
    type: String,
    default: '',
  },
  onCopied: {
    type: Function,
    default: () => {},
  }
});
const emit = defineEmits(['copied']);
const kebabCasedType = ref(kebabCase(props.type));
const text = ref(`<${kebabCase(props.name)} />`);

const onCopied = () => {
  emit('copied', props.type, text.value);
};
</script>
