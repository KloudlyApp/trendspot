export default function formatDateYYYYMMDD(date) {
  // Parse the date
  const parsedDate = new Date(date)

  // Check if the date is valid
  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date')
  }

  // Format the date as YYYY-MM-DD
  return parsedDate.toISOString().split('T')[0]
}
