export const displayDate = (timestamp: number): string => {
  const now = Date.now();
  const subtraction = now - timestamp;
  switch (true) {
    case subtraction < 1000:
      return '現在';
    case subtraction < 60000:
      const sec = Math.floor(subtraction / 1000);
      return `${sec}秒前`;
    case subtraction < 3600000:
      const minutes = Math.floor(subtraction / 60000);
      return `${minutes}分`;
    case subtraction < 86400000:
      const hour = Math.floor(subtraction / 3600000);
      return `${hour}時間`;
    case subtraction < 172800000:
      return '昨日';
    case subtraction < 259200000:
      return '2日前';
    default:
      const nowDate = new Date(now);
      const date = new Date(timestamp);
      const nowYear = `${nowDate.getFullYear()}`;
      const boardYear = `${date.getFullYear()}`;
      const boardMonth = `${date.getMonth() + 1}`;
      const boardDay = `${date.getDate()}`;
      const commonWord = `${boardMonth}月${boardDay}日`;
      const displayWord =
        nowYear === boardYear ? `${boardYear}年${commonWord}` : commonWord;
      return displayWord;
  }
};