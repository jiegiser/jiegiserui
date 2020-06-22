import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/input';
interface DataSoureObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSoureObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /**进行过滤数据的方法 */
    fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /**用户选择事件 */
    onSelect?: (item: DataSourceType) => void;
    /**自定义建议列表筛选样式 */
    renderOption?: (item: DataSourceType) => ReactElement;
}
/**
 *
 * @param props
 */
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
