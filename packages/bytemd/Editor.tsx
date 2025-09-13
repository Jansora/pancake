"use client";

import {clsx} from "clsx"

import React, {Dispatch, SetStateAction} from 'react';
import {Editor, EditorProps} from '@bytemd/react';

import {plugins, sanitize, simplePlugins, uploadImages} from "./util";


import "bytemd/dist/index.css";
import "katex/dist/katex.min.css";

import './theme/github-markdown.css';
import "./plugins/prismplus.css";
import './code-mirror.css';
import './index.css';

export interface CustomLightEditorProps extends EditorProps {
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    className?: string,
}
export interface CustomEditorProps extends CustomLightEditorProps {
    uploadFn: React.FC,
}
export const ByteEditor = (props: CustomEditorProps) => {

    const {value, setValue, uploadFn, className} = props

    return (
        <div className={clsx(className, "byte-editor")}>
            <Editor
                sanitize={sanitize}
                value={value}
                plugins={plugins}
                onChange={setValue}
                editorConfig={{}}
                uploadImages={(files) => uploadImages(files, uploadFn)}
            />
        </div>
    )
}


export const ByteLightEditor = (props: CustomLightEditorProps) => {

    const {value, setValue, className} = props

    return (
        <div className={clsx(className, "byte-editor")}>
            <Editor
                value={value}
                plugins={simplePlugins}
                onChange={setValue}
            />
        </div>
    )
}