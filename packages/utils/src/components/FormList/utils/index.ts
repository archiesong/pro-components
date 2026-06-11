/**
 * Moves an array item from one position in an array to another.
 *
 * Note: This is a pure function so a new array will be returned, instead
 * of altering the array argument.
 *
 * @param array         Array in which to move an item.         (required)
 * @param moveIndex     The index of the item to move.          (required)
 * @param toIndex       The index to move item at moveIndex to. (required)
 */
export function move<T>(array: T[], moveIndex: number, toIndex: number) {
  const { length } = array
  if (moveIndex < 0 || moveIndex >= length || toIndex < 0 || toIndex >= length) {
    return array
  }
  const item = array[moveIndex]
  const diff = moveIndex - toIndex

  if (diff > 0) {
    // move left
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, moveIndex),
      ...array.slice(moveIndex + 1, length),
    ]
  }
  if (diff < 0) {
    // move right
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, toIndex + 1),
      item,
      ...array.slice(toIndex + 1, length),
    ]
  }
  return array
}

export function defaultGetValueFromEvent(valuePropName: string, ...args: any[]) {
  const event = args[0]
  if (event && event.target && typeof event.target === 'object' && valuePropName in event.target) {
    return (event.target as HTMLInputElement)[valuePropName as 'value']
  }
  return event
}
