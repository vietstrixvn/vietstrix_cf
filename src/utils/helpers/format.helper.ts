export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

export const getPricingTypeLabel = (type: string) => {
  switch (type) {
    case 'included':
      return 'Included (Free in plan)';
    case 'fixed':
      return 'Fixed Price';
    case 'quantity':
      return 'Quantity-based';
    default:
      return type;
  }
};
