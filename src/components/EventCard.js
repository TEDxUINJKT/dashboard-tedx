import { Link } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { MdLocationOn, MdAccessTimeFilled } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";

import { datePrettier } from '../utils/dateConverter'

import style from '../styles/components/EventCard.module.css'

export default function EventCard({ data }) {
    return (
        <div style={{ backgroundImage: `url(${data.thumbnail.url})` }} className={style.card}>
            <div className={style.content}>
                <span className={style.tag_type}>{data.type}</span>
                <h3>{data.event}</h3>
                <div className={style.detail_content}>
                    <span>
                        <IconContext.Provider value={{ className: 'icon' }}>
                            <BsCalendarDateFill />
                        </IconContext.Provider>
                        {datePrettier(data.date)}
                    </span>
                </div>
                <div className={style.detail_content}>
                    <span>
                        <IconContext.Provider value={{ className: 'icon' }}>
                            <MdAccessTimeFilled />
                        </IconContext.Provider>
                        {data.time}
                    </span>
                    <span>
                        <IconContext.Provider value={{ className: 'icon' }}>
                            <MdLocationOn />
                        </IconContext.Provider>
                        {data.place}
                    </span>
                </div>
                <Link to={`/event/manage/${data._id}`}>
                    <button>Manage</button>
                </Link>
            </div>
        </div>
    )
}