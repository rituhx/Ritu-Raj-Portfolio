/**
 * Graduation / milestone gallery.
 *
 * TEMPORARY DEMO IMAGES — files in assets/images/graduation/ are layout
 * placeholders until real photographs replace them.
 *
 * To use your own photos later:
 * 1. Replace 01.jpg … 50.jpg in assets/images/graduation/
 * 2. Keep the same filenames. No HTML changes required.
 */
function pad(n) {
  return String(n).padStart(2, "0");
}

export const GALLERY_TOTAL = 50;

export const graduationPhotos = Array.from({ length: GALLERY_TOTAL }, (_, i) => {
  const id = i + 1;
  const n = pad(id);
  return {
    id,
    image: "assets/images/graduation/" + n + ".jpg",
    title: "Graduation Moment " + n,
    category: "Graduation"
  };
});

export const FEATURED_COUNT = 3;
