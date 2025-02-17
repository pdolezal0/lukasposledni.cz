import * as React from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { clsx } from 'clsx'
import { urlForImage } from '~/utils/image-url'

import type { LANDING_PAGE_QUERYResult } from '../../sanity/sanity.types'

type Props = {
  images: NonNullable<LANDING_PAGE_QUERYResult>['gallery']['images']
}

const ImageGallery = (props: Props) => {
  const { images } = props

  const containerRef = React.useRef<HTMLDivElement | null>(null)

  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 768px)')

  const [totalColumns, setTotalColumns] = React.useState<Element[][]>([])
  const [galleryHeight, setGalleryHeight] = React.useState({
    currentHeight: 0,
    step: 0,
    hasLoadedMore: false,
  })

  const STEP = isTablet ? 4 : 6
  const LOADING_STEP = isTablet ? 3 : 5

  function handleMore() {
    const totalHeight = containerRef.current?.clientHeight!

    if (
      galleryHeight.currentHeight <= totalHeight &&
      totalHeight - galleryHeight.currentHeight >
        galleryHeight.step + galleryHeight.step / 2
    ) {
      setGalleryHeight({
        ...galleryHeight,
        hasLoadedMore: true,
        currentHeight: galleryHeight.currentHeight + galleryHeight.step,
      })
    } else {
      setGalleryHeight({
        ...galleryHeight,
        hasLoadedMore: true,
        currentHeight: totalHeight,
      })
    }
  }

  React.useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const tempColumns: Element[][] = []

    for (const el of Array.from(containerRef.current.children)) {
      let group = tempColumns.find(
        (g) => g[0].getBoundingClientRect().x === el.getBoundingClientRect().x,
      )

      if (!group) {
        group = []
        tempColumns.push(group)
      }

      group.push(el)
    }

    setTotalColumns(tempColumns)
  }, [containerRef.current?.clientWidth])

  React.useEffect(() => {
    for (const column of totalColumns) {
      let colHeight = 0
      const lastElMarginBottom = (isDesktop ? 20 : 10) * 2

      for (const [index, el] of column.entries()) {
        const img = el.childNodes[0] as HTMLImageElement

        if (index < STEP) {
          colHeight += el.clientHeight
        }

        if (index < LOADING_STEP) {
          img.loading = 'eager'
          img.decoding = 'sync'
        }
      }

      setGalleryHeight({
        ...galleryHeight,
        currentHeight: colHeight - lastElMarginBottom,
        step: colHeight - lastElMarginBottom,
      })
    }
  }, [containerRef.current])

  return (
    <>
      <div
        className={clsx(
          'overflow-hidden',
          galleryHeight.hasLoadedMore && 'h-(--height)',
          !galleryHeight.hasLoadedMore &&
            'aspect-[350/1060] md:aspect-[1240/2440]',
        )}
        style={
          {
            '--height': `${galleryHeight.currentHeight}px`,
          } as React.CSSProperties
        }
      >
        <div
          className='columns-2 gap-x-2.5 gap-y-2.5 md:columns-3 lg:gap-x-5'
          ref={containerRef}
        >
          {images?.map((image, i) => (
            <figure
              className='break-inside-avoid pb-2.5 lg:pb-5'
              key={image.id}
            >
              <img
                src={urlForImage(image.url!).width(400).url()}
                srcSet={`${urlForImage(image.url!).width(400).url()} 1x, ${urlForImage(image.url!).width(800).url()} 2x`}
                alt=''
                width={image.width!}
                height={image.height!}
                loading='lazy'
                decoding='async'
                style={{
                  backgroundSize: 'cover',
                  backgroundImage: `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="img-blur" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="20"/><feComponentTransfer><feFuncA type="discrete" tableValues="1 1"/></feComponentTransfer></filter><g filter="url(%23img-blur)"><image width="100%" height="100%" href="${image.lqip}"/></g></svg>')`,
                }}
              />
            </figure>
          ))}
        </div>
      </div>
      {galleryHeight.currentHeight !== containerRef.current?.clientHeight! ? (
        <button
          onClick={handleMore}
          className='mt-2 inline-flex w-full cursor-pointer items-center justify-center bg-neutral-50/50 py-5 ring-2 ring-neutral-100 outline-none ring-inset hover:bg-neutral-50 focus-visible:ring-neutral-200 md:py-6'
        >
          Chci vidět víc
        </button>
      ) : null}
    </>
  )
}

export default ImageGallery
