export default async function copy(text: string) {
  if ('clipboard' in navigator) {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      // do nothing
    }
  } else {
    return
  }
}
