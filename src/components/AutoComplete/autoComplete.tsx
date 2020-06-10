import React, { FC, useState, ChangeEvent, ReactElement } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'

interface DataSoureObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSoureObject

// Omit<InputProps, 'onSelect'> 忽略 onSelect 属性
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**进行过滤数据的方法 */
  fetchSubbestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>,
  /**用户选择事件 */
  onSelect?: (item: DataSourceType) => void,
  /**自定义建议列表筛选样式 */
  renderOption?: (item: DataSourceType) => ReactElement
}

/**
 * 
 * @param props 
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSubbestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props
  const [ inputValue, setInputValue ] = useState(value)
  const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([])
  const [ loading, setLoading ] = useState(false)
  console.log(suggestions)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 去掉空格
    const value = e.target.value.trim()
    setInputValue(value)
    // 如果用户输入值，然后根据用户的筛选方法进行得到筛选到结果显示在建议的列表
    if (value) {
      const results = fetchSubbestions(value)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
  }
  const handleSelect = (item: DataSourceType) => {
    // 设置 inpit 中内容
    setInputValue(item.value)
    // 将建议列表清空
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
  }
  const renderTemplete = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <ul>
        {
          suggestions.map((item, index) => {
            return (
              <li key={index} onClick={() => handleSelect(item)}>
                { renderTemplete(item) }
              </li>
            )
          })
        }
      </ul>
    )
  }
  return (
    <div className="jiegiser-auto-complete">
      <Input
        value={inputValue}
        onChange={handleChange}
        {...restProps}
      />
      { loading && <ul><Icon icon="spinner" spin /></ul> }
      { suggestions.length > 0 && generateDropdown() }
    </div>
  )
}

export default AutoComplete;