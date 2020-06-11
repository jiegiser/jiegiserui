import React from 'react'
import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent, wait, cleanup } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete'
// 将 transition 设置为同步
config.disabled = true

const testArray = [
  {value: 'ab', number: 11},
  {value: 'abc', number: 1},
  {value: 'b', number: 4},
  {value: 'c', number: 15},
]
interface LakerPlayerProps {
  value: string
  number: number
}


const renderOption = (item: DataSourceType) => {
  const itemObj = item as DataSourceType<LakerPlayerProps>
  return (
    <>
      <h2>Name: {itemObj.value}</h2>
      <p>url: {itemObj.number}</p>
    </>
  )
}
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

const handleFetchGithub = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then(res => res.json())
    .then(({ items }) => {
      return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
    })
}
const promiseProps: AutoCompleteProps = {
  fetchSuggestions: handleFetchGithub,
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}
let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps}/>)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  // 显示下拉菜单
  it('test basic AutoComplete behavior', async () => {
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    // should have two suggestion items
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    // click the first item
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    // fill the input
    expect(inputNode.value).toBe('ab')
  })
  // 键盘事件
  it('should provide keyboard support', async () => {
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    const firstResult = wrapper.queryByText('ab')
    const secondResult = wrapper.queryByText('abc')

    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(firstResult).toHaveClass('is-active')
    // arrow down 
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(secondResult).toHaveClass('is-active')
    // arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(firstResult).toHaveClass('is-active')
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  // 点击空白消失
  it('click outside should hide the dropdown', async () => {
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    // 点击外部对象
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  // 自定义渲染
  it('renderOption should generate the right template', async () => {
    cleanup()
    const wrapper = render(<AutoComplete {...testProps} renderOption={renderOption} />)
    const inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('Name: ab')).toBeInTheDocument()
      expect(wrapper.queryByText('url: 11')).toBeInTheDocument()
    })
    // should have two suggestion items
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    // click the first item
    fireEvent.click(wrapper.getByText('Name: ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(wrapper.queryByText('Name: ab')).not.toBeInTheDocument()
    // fill the input
    expect(inputNode.value).toBe('ab')
  })
  // 异步返回建议列表
  it('async fetchSuggestions should works fine', async () => {
    cleanup()
    const wrapper = render(<AutoComplete {...promiseProps} />)
    const inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('A')).toBeInTheDocument()
    })
    // click the first item
    fireEvent.click(wrapper.getByText('A'))
    expect(promiseProps.onSelect).toHaveBeenCalledWith({
      avatar_url: "https://avatars2.githubusercontent.com/u/1410106?v=4",
      events_url: "https://api.github.com/users/A/events{/privacy}",
      followers_url: "https://api.github.com/users/A/followers",
      following_url: "https://api.github.com/users/A/following{/other_user}",
      gists_url: "https://api.github.com/users/A/gists{/gist_id}",
      gravatar_id: "",
      html_url: "https://github.com/A",
      id: 1410106,
      login: "A",
      node_id: "MDQ6VXNlcjE0MTAxMDY=",
      organizations_url: "https://api.github.com/users/A/orgs",
      received_events_url: "https://api.github.com/users/A/received_events",
      repos_url: "https://api.github.com/users/A/repos",
      score: 1,
      site_admin: false,
      starred_url: "https://api.github.com/users/A/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/A/subscriptions",
      type: "User",
      url: "https://api.github.com/users/A",
      value: "A"
    })
    expect(wrapper.queryByText('A')).not.toBeInTheDocument()
    // fill the input
    expect(inputNode.value).toBe('A')
  })
})