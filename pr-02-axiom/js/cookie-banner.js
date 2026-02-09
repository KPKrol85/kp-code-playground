(function () {
  const KEY = "cookie-consent-v1";
  const banner = document.getElementById("cookieBanner");
  if (!banner) return;
  const stored = (() => {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  })();
  if (stored) {
    banner.remove();
    return;
  }
  banner.hidden = false;
  function save(val) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: 1, value: val, ts: Date.now() }));
    } catch (e) {}
    document.cookie = "cookie_consent=" + val + "; max-age=15768000; path=/; SameSite=Lax";
    banner.remove();
  }
  banner.addEventListener("click", (e) => {
    if (e.target.closest("#cookieAccept")) save("accepted");
    if (e.target.closest("#cookieReject")) save("rejected");
  });
})();
