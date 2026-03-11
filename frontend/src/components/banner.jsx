import banner from "../assets/banner.png"

function Banner() {

  return (

    <div>

      <img
        src={banner}
        alt="banner"
        className="w-full h-[400px] object-cover"
      />

    </div>

  )
}

export default Banner
