export default async function AdminCategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <section>Details for Category ID: {id}</section>;
}
