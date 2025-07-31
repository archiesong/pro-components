import { message } from 'ant-design-vue';
import { defineComponent, PropType, ref } from 'vue';
import CopyableIcon from './CopyableIcon.vue';
import { useI18n } from 'vue-i18n';
const Category = defineComponent({
  name: 'Category',
  props: {
    icons: {
      type: Array as PropType<string[]>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    newIcons: {
      type: Array,
      default: () => [],
    },
    theme: {
      type: String,
      default: 'filled',
    },
  },
  setup(props) {
    const justCopied = ref< string | null>(null);
    const { t } = useI18n();
    const onCopied = (type: string, text: string) => {
      message.success(
        <span>
          <code class="copied-code">{text}</code> copied 🎉
        </span>,
      );
      justCopied.value = type;
      setTimeout(() => {
        justCopied.value = null;
      }, 2000);
    }
    return () => {
      const { icons, title, theme, newIcons } = props;
      const items = icons.map(name => {
        return (
          <CopyableIcon
            key={name}
            name={name}
            type={name}
            theme={theme}
            isNew={newIcons.indexOf(name) >= 0}
            justCopied={justCopied.value}
            onCopied={onCopied}
          />
        );
      });
      return (
        <div>
        <h3 style="margin: 1.6em 0 .6em;">
          {t(`app.docs.components.icon.category.${title}`)}
        </h3>
        <ul class={'anticons-list'}>{items}</ul>
      </div>
      )
    }
  },
});

export default Category;
