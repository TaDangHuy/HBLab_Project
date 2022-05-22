const createData = (
  name,
  content,
  author,
  date,
  category,
  assignee,
  status
) => {
  return { name, content, author, date, category, assignee, status };
};

export const rowsListRequest = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,3, 4, 5, 6, 7, 8, 9].map((index) =>
  createData(
    "nghiem",
    "yeu cau mua hang",
    "conglb",
    new Date().toLocaleDateString(),
    "marketing",
    "nghiemnv",
    "open"
  )
);
