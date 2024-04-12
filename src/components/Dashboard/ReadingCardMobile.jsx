import React from 'react'

export default function ReadingCard({titleAbbrv, titleFull, reading, bodyText, cardWidth, cardMargin, extrasReading, extrasBody}) {
  return (
    <div className={` content-center items-center ${cardWidth} ${cardMargin} justify-between`}>
        
        <div className={`heading2 max-[375px]:text-3xl card-reading w-[15rem] max-[375px]:w-[8rem] flex-center bg-primary2 rounded-xl text-grey8 py-4 ${extrasReading}`}>
            <h1 style={{ fontFamily: '"Montserrat", sans-serif' }}>{reading}</h1>
        </div>
        <div className={`body2 card-body ${bodyText} ${extrasBody}`}>
            <h1 className='font-bold text-lg inline-block' style={{ fontFamily: '"Montserrat", sans-serif' }}>{titleAbbrv}</h1>
            <h2 className='text-sm inline-block' style={{ fontFamily: '"Montserrat", sans-serif' }}>({titleFull})</h2>
        </div>
        
    </div>
  )
}
