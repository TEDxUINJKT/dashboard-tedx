import bg from '../assets/hand_bf2.png'
import bg2 from '../assets/hand_bf2(1).png'

import style from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <section className={style.page_layout}>
      <div className={style.page_content}>
        <span>Hi, Odin</span>
        <h1>WELCOME TO <br /> TEDX DASHBOARD</h1>
        <img className={style.bg1} src={bg} alt="hand background" width="50%" />
        <img className={style.bg2} src={bg2} alt="hand background" width="50%" />
      </div>
      {/* <div className={style.modern_carousel}>
        <div className={style.box_wrapper}>
          <div className={style.side}></div>
          <div className={style.side}></div>
          <div className={style.side}></div>
          <div className={style.side}></div>
          <div className={style.side}></div>
          <div className={style.side}></div>
        </div>
      </div> */}
    </section>
  );
}