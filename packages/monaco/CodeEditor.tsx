/*
* @file DefaultLayout.jsx.jsx
* @author jansora
* @date 2020/2/12
*/


import React, {useEffect, useRef, useState} from "react";
import LazyLoadEditor from "./LazyLoadEditor";

// @ts-ignore
const CodeEditor = (props) => {

    const {onChange, id, force} = props;

    const theme = props.dark ? "vs-dark" : "vs";
    const language = props.language ? props.language : 'javascript';

    const style = props.style ? props.style  : {};
    const value = props.value ? props.value : "";
    const readOnly = !!props.readOnly;
    const options = props.options ? props.options  : {};

    const monacoLoaded = LazyLoadEditor({});
    const [loading, setLoading] = useState(false);

    const ref = useRef(null);

    const [model, setModel] = useState(null);


    useEffect(() => {
        // console.log("xxx", language, theme)
        setLoading(true)
        // model && model.dispose()
        // setModel(window.monaco.editor.createModel(value, language))
        setTimeout(() => setLoading(false), 100)
    }, [language, theme])

    // const monaco = window.monaco;

    useEffect(() => {
        if( monacoLoaded && !model) {
            // @ts-ignore
            setModel(window.monaco.editor.createModel(value, language))
        }
    }, [monacoLoaded, model])


    useEffect(() => {
        if(monacoLoaded && model && !loading) {
            console.log("crete editor", "editor", language, theme)
            // @ts-ignore
            const editor = window.monaco.editor.create(ref.current, {
                model, language, theme, ...options, readOnly
            })
            // @ts-ignore
            editor.onDidChangeModelContent((event) => onChange && onChange(model.getValue()))
            editor.setModelLanguage && editor.setModelLanguage(model, language)
            // @ts-ignore
            model.setValue(value)
            // setEditor(editor)
        }
        // eslint-disable-next-line
    }, [ref, model, language, theme, loading]);


    useEffect(() => {
        if(monacoLoaded && force) {
            // @ts-ignore
            model.setValue(value);
        }
        // eslint-disable-next-line
    }, [value, force, model]);


    // @ts-ignore
    useEffect(() => () => model && model.dispose(), [])

    if (loading || !monacoLoaded) {
        return <></>
    }


    return (
        <div style={{padding: '16px 0', backgroundColor: props.dark ? '#1E1E1E' : '#FFFFFE'}}>
            <div id={id ? id : "monaco"} ref={ref} style={{
                width: '100%', height: '500px',
                ...style}}  />
        </div>


    )
}

export default CodeEditor;
