import { EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GoDotFill } from "react-icons/go";

const SwiperCreative = () => {
  return (
    <>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="card border p-5 rounded bg-white">
            <div className="card-body">
              <p className="text-[16px] font-normal">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatibus.
              </p>
              <div className="flex justify-center items-center mt-4">
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  className="rounded-full  w-14"
                  alt="avatar"
                />
                <div className="ml-4">
                  <h1 className="text-md font-medium">Eko</h1>
                  <p className="text-gray-700 text-sm mt-[-0.5rem]">Pasien</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card border p-5 rounded bg-white">
            <div className="card-body">
              <p className="text-[16px] font-normal">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatibus.
              </p>
              <div className="flex justify-center items-center mt-4">
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  className="rounded-full  w-14"
                  alt="avatar"
                />
                <div className="ml-4">
                  <h1 className="text-md font-medium">Eko</h1>
                  <p className="text-gray-700 text-sm mt-[-0.5rem]">Pasien</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card border p-5 rounded bg-white">
            <div className="card-body">
              <p className="text-[16px] font-normal">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatibus.
              </p>
              <div className="flex justify-center items-center mt-4">
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  className="rounded-full  w-14"
                  alt="avatar"
                />
                <div className="ml-4">
                  <h1 className="text-md font-medium">Eko</h1>
                  <p className="text-gray-700 text-sm mt-[-0.5rem]">Pasien</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <p className="flex items-center my-2">
        <GoDotFill size={20} color="red" />
        Geser untuk melihat testimoni lainnya
      </p>
    </>
  );
};

export default SwiperCreative;
