/*
* @file DiffEditor.jsx
* @author jansora
* @date 2020/2/12
*/


import React, {useEffect, useRef, useState} from "react";
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main';
import styled from "styled-components";
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
`
const DiffEditor = (props) => {

    const {original, modified} = props;
    const ref = useRef(null);
    const style = props.style ? props.style  : {};
    const [editor, setEditor] = useState(null);

    useEffect(() => {

        if(ref.current) {

            setEditor(monaco.editor.createDiffEditor(
                ref.current, {theme: "vs", readOnly: true})
            )
        }
    }, [ref]);

    useEffect(()=> {
        console.log(editor, original, modified)
        if(editor) {
            editor.setModel({
                original: monaco.editor.createModel(original.data, original.language),
                modified: monaco.editor.createModel(modified.data, modified.language)
            });
        }


    }, [editor, modified, original])
    
    return (
        <Wrapper id="monaco" ref={ref} style={style}/>
    )
}

export default DiffEditor;