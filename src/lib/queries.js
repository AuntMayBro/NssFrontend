export const queries = {
  team: `*[_type == "team" && type == "current"] | order(vertical->order asc, name asc){
    name,
    "role": coalesce(vertical->title, role),
    image,
    year,
    type,
    linkedin,
    email
  }`,

  upcomingEvents: `*[_type == "event" && date >= now()] | order(date asc)[0...6]{
    _id, title, slug{current}, date, venue, isFeatured, "coverImage": coverImage.asset->url
  }`,

  allEvents: `*[_type == "event"] | order(date desc){
    _id, title, slug{current}, date, venue, isFeatured, "coverImage": coverImage.asset->url
  }`,

  eventBySlug: `*[_type == "event" && slug.current == $slug][0]{
    _id, title, date, venue, description[]{..., markDefs[]{..., _type}}, "coverImage": coverImage.asset->url,
    gallery[]{asset->{_id, url}}, organizers[]->{_id, name, role, "avatar": avatar.asset->url}
  }`,

  gallery: `*[_type == "galleryImage"] | order(takenAt desc){
    _id, caption, "image": image.asset->url, "event": event-> { _id, title, slug }, uploadedBy-> { name, _id, "avatar": avatar.asset->url }, takenAt
  }`,

  messages: `*[_type == "message"] | order(_createdAt desc){
    _id, name, year, photo{asset->url}, text
  }`,

  siteSettings: `*[_type == "siteSettings"][0]{
    siteTitle, siteDescription, defaultShareImage{asset->url}, gaId, downloads[]
  }`,

  resources: `*[_type == "resource"] | order(publishedDate desc){
    _id, title, category, academicYear, publishedDate, "fileUrl": file.asset->url
  }`,

  mentors: `*[_type == "mentor"] | order(priority asc){
    _id, name, role, message, "image": image.asset->url
  }`,

  programOfficer: `*[_type == "programOfficer"][0]{
    _id, name, role, message, "image": image.asset->url, "coverImage": coverImage.asset->url
  }`,

  // Fetch verticals with their assigned head for a specific year (or generally current)
  // We actually want to fetch verticals and *expand* the team member assigned to it for the current session
  verticals: `*[_type == "vertical"] | order(order asc){
    _id,
    title,
    order,
    description,
    "currentHead": *[_type == "team" && references(^._id) && type == "current"][0]{
      name,
      "image": image.asset->url,
      email,
      linkedin
    }
  }`,
};
