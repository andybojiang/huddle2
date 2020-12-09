export default function usePasscode() {
  const match = window.location.search.match(/passcode=([0-9]*)&?/);
  const passcode = match ? match[1] : window.sessionStorage.getItem('passcode');
  if (passcode) {
    return passcode;
  } else {
    return '';
  }
}
