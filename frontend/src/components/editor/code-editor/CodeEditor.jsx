/*
* @file index.jsx.jsx
* @author jansora
* @date 2020/2/12
*/


import React, {useEffect, useRef, useState} from "react";

import * as monaco from 'monaco-editor/esm/vs/editor/editor.main';

import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CodeEditor = (props) => {

    const {value, onChange, id, force} = props;
    const language = props.language ? props.language : 'javascript';
    const ref = useRef(null);
    const style = props.style ? props.style  : {};
    const options = props.options ? props.options  : {};
    const [model, setModel] = useState(monaco.editor.createModel(value, language));
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        if(ref.current) {

            setEditor(
                monaco.editor.create(ref.current, {
                    model, ...options, language
                })
            )

        }
    }, [ref, model, language]);


    useEffect(() => {
        if (editor) {
            editor.setModelLanguage(model, language)
        }
    }, [language, model])


    useEffect(() => {

        if(editor && force) {
            model.setValue(value);
        }
    }, [value, force, model]);




    useEffect(() => {
        if(editor) {
            editor.onDidChangeModelContent((event) => onChange && onChange(model.getValue()))
        }
    }, [editor]);


    useEffect(()=> {
        return () => model.dispose()
    }, [])

    return (
        <Wrapper id={id ? id : "monaco"} ref={ref} style={style} />
    )
}

export default CodeEditor;
