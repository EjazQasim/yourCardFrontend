export const isNullOrEmpty = (value: any) => {
  return value === null || value === undefined || value === '' || value === 'null'
}

export const removeNullFields = (obj: any) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === null) {
      delete obj[key]
    }
  }

  return obj
}

export const getInitials = (string: string) =>
  string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')

export const isFloat = (n: number) => {
  return typeof n === 'number' && n % 1 !== 0
}

export const downloadBlob = (content: string, filename: string, contentType: string): void => {
  // Create a blob
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)

  // Create a link to download it
  const pom = document.createElement('a')
  pom.href = url
  pom.setAttribute('download', filename)
  pom.click()
}
