import React from 'react'

export default function PageNotFound() {
  return (
    <div className='not-found'>
        <h1 className='page-not-found-title'>404 - page not found</h1>
        <img src={require('./../assets/gifs/ronSwanson.gif')} alt="Parks and Recreation gif"  className='rs-gif'  />
    </div>
  )
}
