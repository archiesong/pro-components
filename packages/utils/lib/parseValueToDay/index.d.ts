import { default as dayjs } from 'dayjs';
type DateValue = dayjs.Dayjs | dayjs.Dayjs[] | string | string[] | number | number[];
declare const parseValueToDay: (value: DateValue, formatter?: string) => dayjs.Dayjs | dayjs.Dayjs[] | null | undefined;
export default parseValueToDay;
