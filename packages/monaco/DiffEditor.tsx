/*
* @file DiffEditor.jsx
* @author jansora
* @date 2020/2/12
*/


import React, {useEffect, useRef, useState} from "react";
import LazyLoadEditor from "./LazyLoadEditor";
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.main';
// import styled from "styled-components";
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
// import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';

// const Wrapper = styled.div`
//   width: 100%;
//   height: 500px;
// `
// @ts-ignore
const DiffEditor = (props) => {

    const {original, modified} = props;
    const ref = useRef(null);
    const theme = props.dark ? "vs-dark" : "vs";
    const style = props.style ? props.style  : {};
    const [editor, setEditor] = useState(null);
    const [loading, setLoading] = useState(false);

    const monacoLoaded = LazyLoadEditor({});

    useEffect(() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 100)
    }, [theme])

    useEffect(() => {
        if(monacoLoaded && !loading) {
            // @ts-ignore
            const _editor = window.monaco.editor.createDiffEditor(ref.current, {theme, readOnly: true})
            setEditor(_editor)
        }
    }, [ref, monacoLoaded, theme, loading]);

    useEffect(() => {
        if(editor) {
            // @ts-ignore
            editor.setModel({
                // @ts-ignore
                original: window.monaco.editor.createModel(original.data, original.language),
                // @ts-ignore
                modified: window.monaco.editor.createModel(modified.data, modified.language)
            });
        }
    }, [editor, modified, original])

    if (loading || !monacoLoaded) {
        return <></>
    }
    return (
        <div style={{padding: '16px 0', backgroundColor: props.dark ? '#1E1E1E' : '#FFFFFE'}}>
            <div id={props.id ? props.id : "monaco-diff"} ref={ref} style={{
                width: '100%', height: '500px',
                ...style}} />
        </div>

    )
}

export default DiffEditor;