export default function copyToClipboard(element) {
  let range, sel;
  // Ensure that range and selection are supported by the browsers
  if (document.createRange && window.getSelection) {
    range = document.createRange();
    sel = window.getSelection();
    // unselect any element in the page
    sel.removeAllRanges();
    try {
      range.selectNodeContents(element.current);
      sel.addRange(range);
    } catch (error) {
      range.selectNode(element.current);
      sel.addRange(range);
      console.log(error);
    }
    document.execCommand('copy');
  }
  sel.removeAllRanges();
  console.log('Element Copied! Paste it in a file');
}
