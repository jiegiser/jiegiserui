import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
// import Button from '../Button/button'
import Dragger from './dragger'

export type UploadFilesStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFilesStatus
  percent?: number
  raw?: File
  response?: any
  error?: any
}

export interface UploadProps {
  action: string
  defaultFileList?: UploadFile[]
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
  onRemove?: (file: UploadFile) => void
  headers?: {[key: string]: any}
  name?: string
  data?: { [key: string]: any }
  /**发送请求时是否携带 cookie 信息 */
  withCredentials?: boolean
  /**对上传的文件类型进行限制 */
  accept?: string
  /**是否支持多文件上传 */
  multiple?: boolean
  /**是否开启拖拽上传 */
  drag?: boolean
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [ fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  // 第一个参数为需要更新的文件，第二个参数是需要更新的属性， partial 的意思是更新的属性为 UploadFile 中的可选的一些属性，并不是所有的都更新
  const updateFileList = (updateFile: UploadFile, updateobj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return {...file, ...updateobj}
        } else {
          return file
        }
      })
    })
  }
  const handleClick = () => {
    if (fileInput.current) {
      // 点击 input 上传文件
      fileInput.current.click()
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    // 如果没有选择文件
    if (!files) {
      return
    }
    uploadFiles(files)
    // 上传完成，如果 input 中有值进行清空
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }
  // 子组件调用父组件方法进行删除
  const handelRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    // bug 如果上传多个文件，最后获取的 _file 是最后一个文件，改变 fileList 是异步的操作，这里需要改成回调函数的方式
    // setFileList([_file, ...fileList])
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    // 发送给后台需要自定义上传额外参数
    // 下面这个键是不能改变的
    // formData.append(file.name, file)
    formData.append(name || 'file', file)
    // 将用户传入的额外参数发送给后台
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    // 需要自定义 header
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          updateFileList(_file, {
            percent: percentage,
            status: 'uploading'
          })
           if (onProgress) {
             onProgress(percentage, file)
           }
        }
      }
    }).then(resp => {
      updateFileList(_file, {
        status: 'success',
        response: resp.data
      })
      if (onSuccess) {
        onSuccess(resp.data, file)
      }
      if (onChange) {
        onChange(file)
      }
    }).catch(err => {
      updateFileList(_file, {
        status: 'error',
        error: err
      })
      if (onError) {
        onError(err, file)
      }
      if (onChange) {
        onChange(file)
      }
    })
  }
  return (
    <div className="jiegiser-upload-component">
      {/* 不使用 button 来代替触发上传，用户可以自定义 */}
      {/* <Button
        btnType="primary"
        onClick={handleClick}
      >
        Upload File
      </Button> */}
      <div className="jiegiser-upload-input"
        style={{display: 'inline-block'}}
        onClick={handleClick}
      >
        {drag ? 
          <Dragger onFile={(files) => {uploadFiles(files)}}>
            {children}
          </Dragger>:
          children
        }
        <input
          className="jiegiser-file-input"
          style={{display: 'none'}}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList
        fileList={fileList}
        onRemove={handelRemove}
      />
    </div>
  )
}
Upload.defaultProps = {
  name: 'file'
}

export default Upload;
