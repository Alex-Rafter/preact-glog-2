// Libs
import { h } from 'preact'
/* @jsx h */

import { useEffect, useState, useRef } from 'preact/hooks'
import { route } from 'preact-router';

// My Helpers
import { jsonFromSheets } from '../helpers/json-from-sheets'
import { apiUrl } from '../helpers/api-urls'
import { rmHashTagsAndSlugify } from '../helpers/rm-hash-tags-slugify'

// Styles
import '../../css/PrevSingle.scss'

export function PrevSingle ({ createdAt, description, id }) {
  const [fetched, setFetched] = useState(false)
  const previousFetchedValue = useRef('')
  const descEdited = String(description).replace(/#.*$/, '')
  const dateEdited = String(createdAt).replace(/T.*$/, '').replace(/-/g, '')

  useEffect(() => {
    previousFetchedValue.current = fetched
  }, [fetched])

  async function getBlogItem (e) {
    if (fetched === true) return
    setFetched(true)
    const Data = await jsonFromSheets(`${apiUrl}${id}`)
    window.sessionStorage.setItem('article', JSON.stringify(Data))
  }

  async function getBlogItemTwo (e) {
    e.preventDefault()
    console.log('clicking')
    const Data = await jsonFromSheets(`${apiUrl}${id}`)
    console.log('clicking 2')
    window.sessionStorage.setItem('article', JSON.stringify(Data))
    console.log('clicking 3')
    console.log(Data)
    route(`/${rmHashTagsAndSlugify(description)}/`)
  }

  return (
    <div className='preview mb-4 position-relative'>
      <div className='preview__anchor text-decoration-none' onClick={(e) => getBlogItemTwo(e)}>
        <h2 className='h3 fw-light text-dark mb-1 text-lowercase font-monospace'>{descEdited}</h2>
        <p class='small text-danger h-100 d-flex align-items-center mb-0 position-absolute end-0 top-0'>{dateEdited}</p>
      </div>
    </div>
  )
}
