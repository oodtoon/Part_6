import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const message = useNotificationValue()
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!message || message === null) {
    return null;
  } else {
    return <div style={style}>{message}</div>;
  }
};

export default Notification;
