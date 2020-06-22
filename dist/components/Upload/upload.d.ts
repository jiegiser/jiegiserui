import { FC } from 'react';
export declare type UploadFilesStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFilesStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: {
        [key: string]: any;
    };
    name?: string;
    data?: {
        [key: string]: any;
    };
    /**发送请求时是否携带 cookie 信息 */
    withCredentials?: boolean;
    /**对上传的文件类型进行限制 */
    accept?: string;
    /**是否支持多文件上传 */
    multiple?: boolean;
    /**是否开启拖拽上传 */
    drag?: boolean;
}
export declare const Upload: FC<UploadProps>;
export default Upload;
