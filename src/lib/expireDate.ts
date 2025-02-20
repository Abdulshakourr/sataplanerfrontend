




export default function expireDate(date: Date) {


  const expire = new Date(date.getTime() + 4 * 60 * 1000)
  return expire
}
