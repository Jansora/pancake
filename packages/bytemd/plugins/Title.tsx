import type {BytemdPlugin} from 'bytemd'

import {visit} from "unist-util-visit";
import type * as mdast from "mdast";
import type * as unified from "unified";

const remarkCodeTitle: unified.Plugin<[], mdast.Root> = () => {
    return (tree, file) => {
        visit(tree, "code", (node, index, parent) => {
            const metaString = `${node.lang ?? ""} ${node.meta ?? ""}`.trim();
            if (!metaString) return;
            const [title] = metaString.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? [""];
            if (!title && metaString.includes("title=")) {
                file.message("Invalid title", node, "remark-code-title");
                return;
            }
            if (!title) return;

            const titleNode: mdast.Paragraph = {
                type: "paragraph",
                data: {
                    hName: "div",
                    hProperties: {
                        "name": "title",
                        "data-language": node.lang,
                    },
                },
                children: [{ type: "text", value: title }],
            };

            // @ts-ignore
            // console.log("xxx", parent.children, parent.children[index])
            // @ts-ignore
            parent.children.splice(index, 0, titleNode);
            // parent.children.splice(index + 1, 0, titleNode);
            /* Skips this node (title) and the next node (code) */
            // @ts-ignore
            return index + 2;
        });
    };
};
export default function title({
                                         ignoreMissing = true,
                                         ...rest
                                     }): BytemdPlugin {
    return {
        remark: (processor) => processor.use(remarkCodeTitle, ),
    }
}
