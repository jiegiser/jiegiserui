var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
// import Button from '../Button/button'
import Dragger from './dragger';
export var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, name = props.name, headers = props.headers, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, drag = props.drag, children = props.children;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    // 第一个参数为需要更新的文件，第二个参数是需要更新的属性， partial 的意思是更新的属性为 UploadFile 中的可选的一些属性，并不是所有的都更新
    var updateFileList = function (updateFile, updateobj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateobj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            // 点击 input 上传文件
            fileInput.current.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        // 如果没有选择文件
        if (!files) {
            return;
        }
        uploadFiles(files);
        // 上传完成，如果 input 中有值进行清空
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    // 子组件调用父组件方法进行删除
    var handelRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        // bug 如果上传多个文件，最后获取的 _file 是最后一个文件，改变 fileList 是异步的操作，这里需要改成回调函数的方式
        // setFileList([_file, ...fileList])
        setFileList(function (prevList) {
            return __spreadArrays([_file], prevList);
        });
        var formData = new FormData();
        // 发送给后台需要自定义上传额外参数
        // 下面这个键是不能改变的
        // formData.append(file.name, file)
        formData.append(name || 'file', file);
        // 将用户传入的额外参数发送给后台
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        // 需要自定义 header
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, {
                        percent: percentage,
                        status: 'uploading'
                    });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(function (resp) {
            updateFileList(_file, {
                status: 'success',
                response: resp.data
            });
            if (onSuccess) {
                onSuccess(resp.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        }).catch(function (err) {
            updateFileList(_file, {
                status: 'error',
                error: err
            });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    return (React.createElement("div", { className: "jiegiser-upload-component" },
        React.createElement("div", { className: "jiegiser-upload-input", style: { display: 'inline-block' }, onClick: handleClick },
            drag ?
                React.createElement(Dragger, { onFile: function (files) { uploadFiles(files); } }, children) :
                children,
            React.createElement("input", { className: "jiegiser-file-input", style: { display: 'none' }, ref: fileInput, onChange: handleFileChange, type: "file", accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handelRemove })));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
