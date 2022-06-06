// Libs
import { Router } from 'preact-router';
import { h, render, createContext } from "preact";
import { useEffect, useState } from "preact/hooks";
import { createHashHistory } from 'history';

// My Helpers
import { jsonFromSheets } from "./helpers/json-from-sheets";
import { apiUrl } from "./helpers/api-urls";
import { rmHashTagsAndSlugify } from './helpers/rm-hash-tags-slugify';

// Components
import { Previews } from './components/Previews';
import { Article } from "./pages/Article";

// Global State
export const BlogContext = createContext()

// SCSS / Bootstrap
import '../css/custom.scss'
// import '../css/body.scss'


// Component
const Main = () => {
    const [previewData, setPreviewData] = useState([]);

    useEffect(() => {
        getPreviewData();
    }, []);

    const getPreviewData = async () => setPreviewData(await jsonFromSheets(apiUrl))

    return (
        <div class={(previewData.length > 0) ? '' : 'd-none'}>
            <BlogContext.Provider value={previewData}>
                <Router history={createHashHistory()}>
                    <Previews path="/" data={previewData} />
                    {previewData.map(article => <Article path={`/${rmHashTagsAndSlugify(article.description)}`} id={article.id} />)}
                </Router>
            </BlogContext.Provider>
        </div>
    )
}

// Render
const root = document.querySelector("#root");
render(<Main />, root);