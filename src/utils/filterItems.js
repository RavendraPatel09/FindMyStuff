export const filterItems = (items, status, searchQuery) => {
  const query = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesStatus = status === 'all' || item.status === status;
    const searchableText = `${item.name} ${item.description} ${item.location}`.toLowerCase();

    return matchesStatus && (!query || searchableText.includes(query));
  });
};
