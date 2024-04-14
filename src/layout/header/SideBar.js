import { Fragment, useState } from "react";

const SideBar = () => {
  const [twitterId, setTwitterId] = useState("");
  const [evmAddress, setEvmAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // 添加一個新的 state 來追蹤是否正在提交表單

  const validateInput = () => {
    const twitterRegex = /^@[A-Za-z0-9_]{1,15}$/;
    const evmRegex = /^0x[a-fA-F0-9]{40}$/;
    return twitterRegex.test(twitterId) && evmRegex.test(evmAddress);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // 在提交時設置 isSubmitting 為 true

    const normalizedTwitterId = twitterId.toLowerCase();
    const normalizedEvmAddress = evmAddress.toLowerCase();

    if (!validateInput()) {
      setMessage("Please Enter VALID Twitter ID or EVM Address");
      setIsSubmitting(false); // 如果驗證失敗，重置提交狀態
      return;
    }
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          twitterId: normalizedTwitterId,
          evmAddress: normalizedEvmAddress,
        }),
      });
      const data = await response.json();
      setMessage(data.message);
      // 表單提交後清空輸入框
      setTwitterId("");
      setEvmAddress("");
    } catch (error) {
      setMessage("Processing Error");
    }
    setIsSubmitting(false); // 處理完成後重置提交狀態
  };

  return (
    <Fragment>
      <div className="form-back-drop"></div>
      <section className="hidden-bar">
        <div className="inner-box text-center">
          <div className="cross-icon">
            <span className="fa fa-times" />
          </div>
          <div className="title">
            <h4>Early Access</h4>
          </div>
          <div className="appointment-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  value={twitterId}
                  onChange={(e) => setTwitterId(e.target.value)}
                  placeholder="Twitter ID (@example)"
                  disabled={isSubmitting} // 禁用輸入框當正在提交
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={evmAddress}
                  onChange={(e) => setEvmAddress(e.target.value)}
                  placeholder="EVM Address (0x123...)"
                  disabled={isSubmitting} // 禁用輸入框當正在提交
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="theme-btn join-btn"
                  style={{ cursor: isSubmitting ? "not-allowed" : "pointer" }}
                  disabled={isSubmitting}
                >
                  {/* 按鈕顯示提交狀態 */}
                  {isSubmitting ? "Registering..." : "JOIN NOW"}
                </button>
              </div>
            </form>
            {message && <p style={{ color: "#a463ff" }}>{message}</p>}
          </div>
          <div className="social-style-one">
            <a href="https://twitter.com/MerlinRUNESTONE" target="_blank">
              <i className="fab fa-x-twitter" />
            </a>
            <a href="#" target="_blank">
              <i className="fa-regular fa-paper-plane" />
            </a>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default SideBar;
