export let categories = ["Clothing", "Electronics", "Food"];

export const addCategory = (newCat) => {
  if (!categories.includes(newCat)) {
    categories.push(newCat);
  }
};

export const deleteCategory = (cat) => {
  categories = categories.filter((c) => c !== cat);
};