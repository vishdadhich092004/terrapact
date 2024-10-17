const timeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} year${interval === 1 ? "" : "s"} ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} month${interval === 1 ? "" : "s"} ago`;
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval === 1 ? "" : "s"} ago`;
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hour${interval === 1 ? "" : "s"} ago`;
  interval = Math.floor(seconds / 60);
  if (interval >= 1)
    return `${interval} minute${interval === 1 ? "" : "s"} ago`;
  return "Just Now";
};

const timeLeft = (date: Date) => {
  const seconds = Math.floor((date.getTime() - new Date().getTime()) / 1000);

  if (seconds <= 0) return "Delayed";

  let interval = Math.floor(seconds / 31536000); // years
  if (interval >= 1) return `${interval} year${interval === 1 ? "" : "s"} left`;

  interval = Math.floor(seconds / 2592000); // months
  if (interval >= 1)
    return `${interval} month${interval === 1 ? "" : "s"} left`;

  interval = Math.floor(seconds / 604800); // weeks
  if (interval >= 1) return `${interval} week${interval === 1 ? "" : "s"} left`;

  interval = Math.floor(seconds / 86400); // days
  if (interval >= 1) return `${interval} day${interval === 1 ? "" : "s"} left`;

  return "Last Day";
};

export { timeLeft, timeAgo };
