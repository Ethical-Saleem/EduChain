export const formatMY = (value: Date) => {
  return new Date(value)?.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });
};

export const formatDate = (value: Date) => {
  return value?.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};