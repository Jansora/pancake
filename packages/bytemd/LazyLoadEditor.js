const LazyLoadEditor = (props) => {

    if (typeof document == 'undefined') {
        return
    }


    const documentLoaded = document.querySelector("#init-katex") != null;

    if (!documentLoaded) {
        const wrapper = document.createElement('div');
        wrapper.setAttribute("id", "init-katex")
        document.body.appendChild(wrapper);
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jansora.com/lib/katex/0.16.4/dist/katex.min.css';
        // script.src = proxyUrl;
        wrapper.appendChild(link);
    }

}

export default LazyLoadEditor;
