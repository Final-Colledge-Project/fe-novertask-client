const MAX_FILE_ALLOWED_IN_MB = 2
const ALLOWED_IMAGE_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/jpg'
]

export default function isFileValid(
  file: File,
  maxSize: number = MAX_FILE_ALLOWED_IN_MB,
  fileType: 'image' = 'image'
): string | undefined {

  // File type validation
  if (fileType === 'image' && !ALLOWED_IMAGE_FILE_TYPES.includes(file.type)) {
    return 'Invalid file type. Please upload a JPEG, PNG, JPG or GIF image.'
  }

  // check max size
  if (file.size > maxSize * 1024 * 1024) {
    return `File size exceeds ${MAX_FILE_ALLOWED_IN_MB} MB. Please choose a smaller file.`
  }

  // pass all rules
  return undefined
}
