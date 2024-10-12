import styles from './Button.module.css'
function Button(Props) {
    return (
        <button className={`${styles.btn} ${styles[Props.type]}` } onClick={Props.onClick}>
            {Props.children}
        </button>
    )
}
export default Button;