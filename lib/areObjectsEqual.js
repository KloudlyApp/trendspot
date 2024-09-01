export default function areObjectsEqual(obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2
  }

  if (Array.isArray(obj1) !== Array.isArray(obj2)) {
    return false
  }

  if (Array.isArray(obj1)) {
    if (obj1.length !== obj2.length) {
      return false
    }
    for (let i = 0; i < obj1.length; i++) {
      if (!areObjectsEqual(obj1[i], obj2[i])) {
        return false
      }
    }
    return true
  }

  const keys1 = Object.keys(obj1).sort()
  const keys2 = Object.keys(obj2).sort()

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!areObjectsEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}
