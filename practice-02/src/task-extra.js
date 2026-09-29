export function searchTasks(tasks, query) {
  if (typeof query !== "string") {
    return [];
  }
  const trimmedQuery = query.trim();
  if (trimmedQuery.length === 0) {
    return [...tasks];
  }
  const lowerQuery = trimmedQuery.toLowerCase();
  return tasks.filter((task) =>
    task.title.toLowerCase().includes(lowerQuery)
  );
}