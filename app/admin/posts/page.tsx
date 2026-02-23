import AdminPostsClient from "@/components/admin/AdminPostsClient";

export const metadata = {
    title: "Blog Posts | Green Pulse Admin",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminPostsPage() {
    return <AdminPostsClient />;
}
