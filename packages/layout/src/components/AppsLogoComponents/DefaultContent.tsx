import type { Ref, FunctionalComponent } from 'vue';
import type { AppItemProps, AppListProps } from './typing';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import { classNames } from '@ant-design-vue/pro-utils';
/**
 * 默认渲染logo的方式，如果是个string，用img。否则直接返回
 *
 * @param logo
 * @returns
 */
export const defaultRenderLogo = (logo: VueNode | (() => VueNode)): VueNode => {
  if (typeof logo === 'string') {
    return <img width="auto" height={22} src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};

const DefaultContent: FunctionalComponent<{
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
              <div
                key={index}
                class={classNames(`${baseClassName}-content-list-item-group`, hashId)}
              >
                <div class={classNames(`${baseClassName}-content-list-item-group-title`, hashId)}>
                  {app.title}
                </div>
                <DefaultContent
                  hashId={hashId}
                  itemClick={itemClick}
                  appList={app?.children}
                  baseClassName={baseClassName}
                />
              </div>
            );
          }
          return (
            <li key={index} class={classNames(`${baseClassName}-content-list-item`, hashId)}>
              <a
                href={itemClick ? void 0 : app.url}
                onClick={() => itemClick?.(app)}
                target={app.target}
                rel="noreferrer"
              >
                {defaultRenderLogo(app.icon)}
                <div>
                  <div>{app.title}</div>
                  {app.desc ? <span>{app.desc}</span> : null}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DefaultContent;
