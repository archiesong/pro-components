import type { FormInstance } from 'antdv-next'
import type { ProFormInstanceType } from '../components/ProFormContext'
import { runFunction } from '../runFunction'

/**
 * 因为 fieldProps 支持了 function 所以新增了这个方法
 *
 * @param fieldProps
 * @param form
 * @param extraProps
 */
export function getFieldPropsOrFormItemProps(fieldProps: any, form?: (ProFormInstanceType<any> & FormInstance) | null, extraProps?: any): {
  onChange: any
  colSize: number
  [key: string]: any
} {
  if (form === undefined) {
    return fieldProps
  }
  return runFunction(fieldProps, form, extraProps)
}
