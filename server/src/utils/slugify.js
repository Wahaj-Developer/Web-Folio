const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
};

export const generateUniqueSlug = async (model, title, currentSlug = null) => {
  let slug = slugify(title);
  let uniqueSlug = slug;
  let counter = 1;

  let query = { slug: uniqueSlug };
  if (currentSlug) {
    query = { slug: uniqueSlug, _id: { $ne: currentSlug } };
  }

  while (await model.findOne(query)) {
    uniqueSlug = `${slug}-${counter}`;
    query = { slug: uniqueSlug };
    if (currentSlug) {
      query = { slug: uniqueSlug, _id: { $ne: currentSlug } };
    }
    counter++;
  }

  return uniqueSlug;
};

export default slugify;
