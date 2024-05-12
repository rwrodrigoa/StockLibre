import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";

export default function TablePagination({ links }) {
    return (
        <Pagination>
        {links.map((link) => (
            <PaginationContent key={link.label}>
                {link.label === "Anterior" && (
                    <PaginationItem>
                        <PaginationPrevious href={link.url} />
                    </PaginationItem>
                )}
                {link.label != "Anterior" && link.label != 'Próximo' &&
                <PaginationItem>
                    <PaginationLink href={link.url} isActive={link.active}>
                        {link.label}
                    </PaginationLink>
                </PaginationItem>
                }
                {link.label === "Próximo" && (
                    <PaginationItem>
                        <PaginationNext href={link.url} />
                    </PaginationItem>
                )}
            </PaginationContent>
        ))}
    </Pagination>
    )
}
