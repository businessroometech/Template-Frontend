import React, { useRef, useEffect } from "react";
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from "swiper/react";
import lightGallery from "lightgallery";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const MediaGallery = ({ media }) => {
  const galleryRef = useRef(null);
  const galleryInstance = useRef(null);

  useEffect(() => {
    if (galleryRef.current) {
      galleryInstance.current = lightGallery(galleryRef.current, {
        plugins: [lgThumbnail, lgZoom],
        dynamic: true,
        dynamicEl: media.map((src, index) => ({
          src,
          thumb: src,
          subHtml: `<div class="lightGallery-caption">Image ${index + 1}</div>`,
        })),
      });
    }

    return () => {
      if (galleryInstance.current) {
        galleryInstance.current.destroy();
        galleryInstance.current = null;
      }
    };
  }, [media]);

  const openGallery = (index) => {
    if (galleryInstance.current) {
      galleryInstance.current.openGallery(index);
    }
  };

  if (!media.length) return null;

  return (
    <div className="w-full max-h-[600px] mb-3">
      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={10}
        slidesPerView={media.length > 1 ? 2 : 1}
        onSwiper={(swiper) => (galleryInstance.current = swiper)}
      >
        {media.map((src, index) => (
          <SwiperSlide key={index} onClick={() => openGallery(index)}>
            <div style={{height : '100%', width : '100%'}}>
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="object-cover w-full h-full transition-transform duration-300"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hidden gallery container */}
      <div
        ref={galleryRef}
        className="hidden"
        data-lg-dynamic-elements={JSON.stringify(
          media.map((src, index) => ({
            src,
            thumb: src,
            subHtml: `<div class="lightGallery-caption">Image ${index + 1}</div>`,
          }))
        )}
      />
    </div>
  );
};

export default MediaGallery;
