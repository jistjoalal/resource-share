// MIME types allowed for upload to S3
const allowedFileTypes = [
  // images
  "image/png",
  "image/jpeg",
  "image/gif",
  // microsoft office
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/onenote",
  // misc
  "application/pdf",
  "text/plain",
];

Slingshot.fileRestrictions("files", {
  allowedFileTypes,
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
});
