import React from 'react'

export default function ReadingCard({titleAbbrv, titleFull, reading, bodyText, cardWidth, cardMargin, extrasReading, extrasBody}) {
  return (
    <div className={`flex flex-wrap ${cardWidth} ${cardMargin} justify-between`}>
        <div className={`body2 card-body flex flex-col justify-center ${bodyText} ${extrasBody}`}>
            <h1 className='font-bold' style={{ fontFamily: '"Montserrat", sans-serif' }}>{titleAbbrv}</h1>
            <h2 style={{ fontFamily: '"Montserrat", sans-serif' }}>{titleFull}</h2>
        </div>
        <div className={`heading2 card-reading w-[15rem] flex-center bg-primary2 rounded-xl text-grey8 py-4 ${extrasReading}`}>
            <h1 style={{ fontFamily: '"Montserrat", sans-serif' }}>{reading}</h1>
        </div>
    </div>
  )
}
