import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Button from '../Button/button'

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
    onRemove
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
    setFileList([_file, ...fileList])
    const formData = new FormData()
    formData.append(file.name, file)
    axios.post(action, formData, {
      headers: {
        'Content-type': 'multipart/form-data'
      },
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
      <Button
        btnType="primary"
        onClick={handleClick}
      >
        Upload File
      </Button>
      <input
        className="jiegiser-file-input"
        style={{display: 'none'}}
        ref={fileInput}
        onChange={handleFileChange}
        type="file"
      />
      <UploadList
        fileList={fileList}
        onRemove={handelRemove}
      />
    </div>
  )
}
export default Upload;
