import AdminPostForm from "@/components/admin/AdminPostForm";

export const metadata = {
    title: "New Post | Green Pulse Admin",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminNewPostPage() {
    return <AdminPostForm />;
}
