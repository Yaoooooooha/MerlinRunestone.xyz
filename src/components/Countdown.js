import React, { useState, useEffect } from "react";

function EventCountdown({ startTime, endTime, setCountdownEnd, auctionLive }) {
  const [currentCountdown, setCurrentCountdown] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const start = new Date(startTime);
      const end = new Date(endTime);
      let countdownText = "";

      if (now < start) {
        // 活动未开始，显示开始倒计时
        const timeLeft = Math.floor((start - now) / 1000); // 秒
        countdownText = `${formatTime(timeLeft)}`;
      } else if (now > start && now <= end) {
        setCountdownEnd(true);
        if (auctionLive || now - start > 50000) {
          // 活动进行中，显示结束倒计时
          const timeLeft = Math.floor((end - now) / 1000); // 秒
          countdownText = `${formatTime(timeLeft)}`;
        } else {
          countdownText = `${formatTime(0)}`;
        }
      }

      setCurrentCountdown(countdownText);
    };

    const timerId = setInterval(updateCountdown, 1000);

    return () => clearInterval(timerId);
  }, [startTime, endTime]);

  // 将秒数格式化为小时、分钟和秒
  function formatTime(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;

    if (m.toString().length === 1) {
      m = `0${m}`;
    }
    if (s.toString().length === 1) {
      s = `0${s}`;
    }

    if (h > 0) {
      return `${h} : ${m} : ${s}`;
    } else if (m > 0) {
      return `${m} : ${s}`;
    } else {
      return `00 : ${s}`;
    }
  }

  return <>{currentCountdown}</>;
}

export default EventCountdown;
