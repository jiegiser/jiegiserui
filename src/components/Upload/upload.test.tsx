import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import { render, RenderResult, fireEvent, wait, createEvent } from '@testing-library/react'

import { Upload, UploadProps } from './upload'

jest.mock('../Icon/icon', () => {
  return ({icon, onClick}) => {
    return <span onClick={onClick}>{icon}</span>
  }
})

jest.mock('axios')
// 将 axios 转换为测试的mocke对象
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'https://jsonplaceholder.typicode.com/posts/',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  drag: true
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', {type: 'image/png'})
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector('.jiegiser-file-input') as HTMLInputElement
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
  })
  it('upload process should works file', async () => {
    const { queryByText } = wrapper
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'})
    // })
    mockedAxios.post.mockResolvedValue({'data': 'cool'})
    // 上传组件是在 dom 中
    expect(uploadArea).toBeInTheDocument()
    // input 
    expect(fileInput).not.toBeVisible()
    // 触发 input 的 change 事件
    fireEvent.change(fileInput, { target: { files: [testFile ]}})
    // 上传时的 icon 图标是否在dom中
    expect(queryByText('spinner')).toBeInTheDocument()
    await wait(() => {
      // 上传文件名在左侧出现
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(queryByText('check-circle')).toBeInTheDocument()
    // onSuccess事件返回
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
    // onChange事件返回
    expect(testProps.onChange).toHaveBeenCalledWith(testFile)
    
    // 删除上传的文件
    expect(queryByText('times')).toBeInTheDocument()
    // 删除
    fireEvent.click(queryByText('times'))
    // test.png 删除
    expect(queryByText('test.png')).not.toBeInTheDocument()
    // 触发 onRemove 事件
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png'
    }))
  })
  it('drag and drop files should works fine', async () => {
    // 触发 dragOver 事件
    fireEvent.dragOver(uploadArea)
    // 是否含有 s-dragover class
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    // 通过 createEvent 创建一个 dropEvent
    const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile]
      }
    })
    fireEvent(uploadArea, mockDropEvent)

    await wait(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
  })

})