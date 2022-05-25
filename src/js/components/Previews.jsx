import { h, render, Component, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { parse } from "preact-parser";
import { PrevSingle } from "./PrevSingle";
// main();

// const Featured = ({ createdAt, description }) => (
//   <PrevSingle
//     content="html here"
//     createdAt={createdAt}
//     description={description}
//   />
// );

export function Previews() {
  const [data, setData] = useState([]);
  const [featuredData, ...notFeatured] = data

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let url =
      "https://api.sheety.co/7016cabf6b37601c93f0bcbd5ec85980/gistsToSheets/gistBlog";
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not OK");
    const json = await response.json();
    const Data = await json.gistBlog;
    setData(Data);
  }

  const returnCorrectEls = (index, pos, el) => {
    if (! index < pos) return 
    return el
  }

  // const itemRet = (item) => <PrevSingle {...item} />
  return (
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <PrevSingle {...featuredData} />
        <div class="row">
          <div class="col-lg-6">
          {notFeatured.map((item, i) => returnCorrectEls(i, 1, <PrevSingle {...item}/>))}
          {/* {notFeatured.map((item, i) => {
            if (i < 1) {
              return <PrevSingle {...item} />}
            })}             */}
            {/* {notFeatured.map(item => <PrevSingle {...item} />)} */}
          </div>
          <div class="col-lg-6">
            {/* {notFeatured.map((item, i) => {
            if (i > 1) {
              <PrevSingle {...item} />}
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}
