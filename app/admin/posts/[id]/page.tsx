import AdminPostForm from "@/components/admin/AdminPostForm";

export const metadata = {
    title: "Edit Post | Green Pulse Admin",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function AdminEditPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolved = await params;
    const postId = Number(resolved.id);

    return <AdminPostForm postId={Number.isNaN(postId) ? null : postId} />;
}
