export const rmHashTagsAndSlugify = description => String(description).replace(/\s/g, '-').replace(/\-#.*/, '')
