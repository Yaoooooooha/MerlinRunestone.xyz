import { Fragment, useState } from "react";

const SideBar = () => {
  const [twitterId, setTwitterId] = useState("");
  const [evmAddress, setEvmAddress] = useState("");
  const [message, setMessage] = useState("");

  const validateInput = () => {
    const twitterRegex = /^@[A-Za-z0-9_]{1,15}$/;
    const evmRegex = /^0x[a-fA-F0-9]{40}$/;
    return twitterRegex.test(twitterId) && evmRegex.test(evmAddress);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // document
    // .querySelector("body")
    // .classList.remove("side-content-visible");

    // 標準化輸入：將 Twitter ID 和 EVM 地址轉為小寫
    const normalizedTwitterId = twitterId.toLowerCase();
    const normalizedEvmAddress = evmAddress.toLowerCase();

    if (!validateInput()) {
      setMessage("Please Enter VALID Twitter ID or EVM Address");
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
      setMessage("Proccessing Error");
    }
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
          {/*Appointment Form*/}
          <div className="appointment-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  value={twitterId}
                  onChange={(e) => setTwitterId(e.target.value)}
                  placeholder="Twitter ID (@example)"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  value={evmAddress}
                  onChange={(e) => setEvmAddress(e.target.value)}
                  placeholder="EVM Address (0x123...)"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="theme-btn">
                  JOIN NOW
                </button>
              </div>
            </form>
            {message && <p style={{ color: "#a463ff" }}>{message}</p>}
          </div>
          {/*Social Icons*/}
          <div className="social-style-one">
            <a href="https://twitter.com/MerlinRUNESTONE" target="_blank">
              <i className="fab fa-x-twitter" />
            </a>
            <a href="#" target="_blank">
              <i className="fa-regular fa-paper-plane" />
            </a>
            {/* <a href="#">
              <i className="fa-regular fa-envelope" />
            </a> */}
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default SideBar;
