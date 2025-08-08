import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface Companion {
    id: string;
    subject: string;
    name: string;
    topic: string;
    duration: number;
}

interface CompanionsListProps {
    title?: string;
    companions?: Companion[];
    className?: string;
}

// Example helper — replace with your own version if you already have one
function getSubjectColor(subject: string) {
    const colors: Record<string, string> = {
        science: "#E5D0FF",
        maths: "#FFDA6E",
        language: "#BDE7FF",
    };
    return colors[subject] || "#eee";
}

export default function CompanionsList({
    title = "Recent Sessions",
    companions = [],
    className,
}: CompanionsListProps) {
    return (
        <article className={cn("companion-list", className)}>
            <h2 className="text-3xl font-bold">{title}</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg w-2/3">Lessons</TableHead>
                        <TableHead className="text-lg">Subject</TableHead>
                        <TableHead className="text-lg">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions.map(({ id, subject, name, topic, duration }) => (
                        <TableRow key={id}>
                            <TableCell className="font-medium">
                                <Link href={`/companions/${id}`}>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                                            style={{ backgroundColor: getSubjectColor(subject) }}
                                        >
                                            <Image
                                                src={`/icons/${subject}.svg`}
                                                alt={subject}
                                                width={35}
                                                height={35}
                                            />
                                        </div>
                                        <div>
                                            <div className="flex flex-col gap-2">
                                                <p className="font-bold text-2xl">{name}</p>
                                            </div>
                                            <p className="text-lg">{topic}</p>
                                        </div>
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="subject-badge w-fit max-md:hidden">
                                    {subject}
                                </div>
                                <div
                                    className="flex items-center justify-center rounded-lg md:hidden"
                                    style={{
                                        backgroundColor: getSubjectColor(subject),
                                        width: 40,
                                        height: 40,
                                    }}
                                >
                                    <Image
                                        src={`/icons/${subject}.svg`}
                                        alt={subject}
                                        width={18}
                                        height={18}
                                    />
                                </div>

                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 w-full justify-end">
                                    <p className="text-2xl">{duration} {' '}
                                        <span className="max-md:hidden">mins</span>
                                    </p>
                                    <Image src="/icons/clock.svg" alt="minutes" height={14} width={14} className="md:hidden" />

                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </article>
    );
}
