import styles from "./Message.module.css";

function Message(Props) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {Props.message}
    </p>
  );
}

export default Message;
