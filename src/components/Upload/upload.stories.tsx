import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'
import Icon from '../Icon/icon'
const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1243, name: 'hello.md', status: 'uploading', percent: 80},
  { uid: '1235', size: 1243, name: 'success.md', status: 'success', percent: 80},
  { uid: '1234', size: 1243, name: 'error.md', status: 'error', percent: 80}
]

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false
  }
  return true
}
const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', {
    type: file.type
  })
  return Promise.resolve(newFile)
}

const SimpleUpload = () => {
  return (
    <div style={{
      width: '360px'
    }}>
      <Upload
        action="https://jsonplaceholder.typicode.com/posts/"
        onProgress={action('progress')}
        onSuccess={action('success')}
        onError={action('error')}
        defaultFileList={defaultFileList}
        onRemove={action('removed')}
        name="fileName"
        data={{'key': 'value'}}
        headers= {{'x-Powered-By': 'jiegiser'}}
        accept=".pdf"
        multiple
        drag
      >
        <Icon icon="upload" size="5x" theme="secondary" />
        <br/>
        <p style={{marginTop: '15px'}}>只能上传pdf文件，且不超过500kb</p>
      </Upload>
    </div>
  )
}

const OnchangeUpload = () => {
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts/"
      onChange = {action('change')}
      beforeUpload={checkFileSize}
    />
  )
}

const OnPromiseUpload = () => {
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts/"
      onChange = {action('change')}
      beforeUpload={filePromise}
    />
  )
}

storiesOf('Upload Component', module)
  .add('Upload', SimpleUpload)
  .add('Onchaneg Upload', OnchangeUpload)
  .add('onPromise Upload', OnPromiseUpload)