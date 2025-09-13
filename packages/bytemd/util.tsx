import {defaultSchema, Schema} from "hast-util-sanitize";


import breaks from '@bytemd/plugin-breaks';

import frontmatter from "@bytemd/plugin-frontmatter"
import gemoji from "@bytemd/plugin-gemoji"

import gfm from '@bytemd/plugin-gfm';
import prismPlus from "./plugins/RehypePrismPlus"

import math from "@bytemd/plugin-math-ssr"
import zoom from "@bytemd/plugin-medium-zoom"
import mermaid from "@bytemd/plugin-mermaid"


import title from "./plugins/Title";


export const plugins = [
    gfm(),
    breaks(),
    prismPlus({
        ignoreMissing: true,
        showLineNumbers: true,
        defaultLanguage: "bash"
    }),
    title({}),



    math(),
    zoom(),
    mermaid(),

    frontmatter(),
    gemoji(),

    // Add more plugins here
];


// @ts-ignore
export const sanitize = (): Schema => ({
    ...defaultSchema,
    attributes: { ...defaultSchema.attributes,
        ...{
            span: ['data-remark-code-title'],
            iframe: ['src', 'width', 'height'],
            code: ['class'],
        },
        //@ts-ignore
        '*': defaultSchema.attributes['*'].concat(['className'])
    },
    tagNames: defaultSchema.tagNames?.concat(["iframe", "embed"])
})

export const uploadImages = async (files: File[], uploadFn: any) => {
    if (files.length < 1) return ['']
    const data = await uploadFn(files)
    // @ts-ignore
    return data.map(file => ({url:file.url, title: file.filename, alt: file.filename}));
}

export const simplePlugins = [
    gfm(),
    breaks(),
    math(),
    // Add more plugins here
];
