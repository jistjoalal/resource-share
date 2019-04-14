
// allows all files
// - need to figure out how to allow the plethora of
//   MS mime types
Slingshot.fileRestrictions("files", {
  allowedFileTypes: /.*/,
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
});
