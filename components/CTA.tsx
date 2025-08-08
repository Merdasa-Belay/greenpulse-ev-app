import Image from "next/image";
import Link from "next/link";

const CTA = () => {
    return (
        <section className="cta-section">
            <div className="cta-badge">Start learning your way.</div>
            <h2 className="text-3xl font-bold">Build and personalize Learning Companion</h2>
            <p>
                Create your own AI-powered learning companion to help you master any subject. Customize it with your preferred topics, subjects, and learning styles.
            </p>
            <Image src="/images/cta.svg" alt="CTA" width={362} height={362} />

            <Link href="/companions/new" className="btn-primary inline-flex items-center mt-4">
                <Image src="/icons/plus.svg" alt="Plus Icon" width={12} height={12} />
                <span className="ml-2">Build a New Companion</span>
            </Link>
        </section>
    );
};

export default CTA;
