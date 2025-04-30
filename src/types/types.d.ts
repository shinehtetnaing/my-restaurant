interface CategoryParams {
  name: string;
}

interface CreateUserParams {
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
}

interface CategoryWithCount {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    menus: number;
  };
}
