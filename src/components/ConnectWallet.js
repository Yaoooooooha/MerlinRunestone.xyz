import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectWalletBtn() {
  return (
    <div>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="connect-wallet-btn"
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="connect-wallet-btn"
                    >
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div style={{ display: "flex", gap: 12 }}>
                    {/* <button
                      onClick={openChainModal}
                      className="connect-wallet-btn"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        background:
                          "url(assets/images/mint-page/operate-buy.png), linear-gradient(to bottom, #f7dcb100, #e39f5b),radial-gradient(circle, #f9e3c200, #f0d6b5), rgba(255, 255, 212, 0.3)",
                        backgroundPosition: "center",
                        backgroundSize: "auto",
                        backgroundRepeat: "no-repeat",
                        opacity: 0.83,
                      }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button> */}

                    <button
                      onClick={openAccountModal}
                      className="connect-wallet-btn"
                      type="button"
                    >
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}
