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
