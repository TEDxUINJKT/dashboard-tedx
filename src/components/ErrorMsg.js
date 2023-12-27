import style from '../styles/components/ErrorMsg.module.css'

export default function ErrorMsg({ title }) {
    return (
        <span className={style.error_message}>{title}</span>
    )
}