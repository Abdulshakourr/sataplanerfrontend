export default function expireDate(date: number) {
  const expire = new Date(new Date().getTime() + date)
  return expire
}
