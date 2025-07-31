import type { Ref, FunctionalComponent } from 'vue';
import type { AppItemProps, AppListProps } from './typing';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import { classNames, isUrl } from '@ant-design-vue/pro-utils';

/**
 * simple 模式渲染logo的方式
 *
 * @param logo
 * @param title
 * @returns
 */
const renderLogo = (logo: VueNode | (() => VueNode), title?: VueNode): VueNode => {
  if (logo && typeof logo === 'string' && isUrl(logo)) {
    return <img src={logo} alt="logo" />;
  }

  if (typeof logo === 'function') {
    return logo();
  }

  if (logo && typeof logo === 'string') {
    return <div id="avatarLogo">{logo}</div>;
  }

  if (!logo && title && typeof title === 'string') {
    const symbol = title.substring(0, 1);
    return <div id="avatarLogo">{symbol}</div>;
  }
  return logo;
};

const SimpleContent: FunctionalComponent<{
  appList?: AppListProps;
  itemClick?: (item: AppItemProps, popoverRef?: Ref<HTMLSpanElement>) => void;
  baseClassName?: string;
  hashId?: string;
}> = ({ baseClassName, hashId, itemClick, appList }) => {
  return (
    <div class={classNames(`${baseClassName}-content`, hashId)}>
      <ul class={classNames(`${baseClassName}-content-list`, hashId)}>
        {appList?.map((app, index) => {
          if (app?.children?.length) {
            return (
              <div key={index} class={classNames(`${baseClassName}-content-list-item-group`, hashId)}>
                <div class={classNames(`${baseClassName}-content-list-item-group-title`, hashId)}>
                  {app.title}
                </div>
                <SimpleContent
                  hashId={hashId}
                  itemClick={itemClick}
                  appList={app?.children}
                  baseClassName={baseClassName}
                />
              </div>
            );
          }
          return (
            <li key={index} class={classNames(`${baseClassName}-content-list-item`,hashId)}>
              <a
                href={itemClick ? 'javascript:void(0);' : app.url}
                onClick={() => itemClick?.(app)}
                target={app.target}
                rel="noreferrer"
              >
                {renderLogo(app.icon, app.title)}
                <div>
                  <div>{app.title}</div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SimpleContent;
