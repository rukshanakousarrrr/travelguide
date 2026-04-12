import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { COMPANY_CURRENCY, COMPANY_LOCALE, BOOKINGS_PER_PAGE } from "@/lib/constants";
import { BookingsTable } from "@/components/admin/BookingsTable";

interface PageProps {
  searchParams: Promise<{
    q?:      string;
    status?: string;
    payment?: string;
    page?:   string;
  }>;
}

export default async function BookingsPage({ searchParams }: PageProps) {
  const sp     = await searchParams;
  const query  = sp.q?.trim() ?? "";
  const status = sp.status ?? "ALL";
  const payment = sp.payment ?? "ALL";
  const page   = Math.max(1, Number(sp.page ?? 1));
  const skip   = (page - 1) * BOOKINGS_PER_PAGE;

  const where: Record<string, unknown> = {};

  if (query) {
    where.OR = [
      { bookingRef:  { contains: query } },
      { guestName:   { contains: query } },
      { guestEmail:  { contains: query } },
      { tour: { title: { contains: query } } },
    ];
  }
  if (status !== "ALL")  where.status        = status;
  if (payment !== "ALL") where.paymentStatus = payment;

  const [bookings, total, stats] = await Promise.all([
    prisma.booking.findMany({
      where,
      skip,
      take: BOOKINGS_PER_PAGE,
      orderBy: { createdAt: "desc" },
      include: {
        tour: {
          select: {
            title: true,
            slug:  true,
            images: { where: { isPrimary: true }, select: { url: true }, take: 1 },
          },
        },
        passengers: { select: { firstName: true, lastName: true, isLead: true } },
      },
    }),
    prisma.booking.count({ where }),
    prisma.booking.aggregate({
      _sum:   { totalAmount: true },
      _count: { id: true },
      where:  { paymentStatus: "PAID" },
    }),
  ]);

  const totalPages = Math.ceil(total / BOOKINGS_PER_PAGE);

  const serialized = bookings.map((b) => ({
    id:              b.id,
    bookingRef:      b.bookingRef,
    tourTitle:       b.tour.title,
    tourSlug:        b.tour.slug,
    tourImage:       b.tour.images[0]?.url ?? null,
    guestName:       b.guestName ?? b.passengers.find((p) => p.isLead)?.firstName ?? "Guest",
    guestEmail:      b.guestEmail,
    guestPhone:      b.guestPhone ?? null,
    tourDate:        b.tourDate.toISOString(),
    numAdults:       b.numAdults,
    numChildren:     b.numChildren,
    totalAmount:     Number(b.totalAmount),
    currency:        b.currency,
    status:          b.status,
    paymentStatus:   b.paymentStatus,
    paymentMethod:   b.paymentMethod,
    adminNotes:      b.adminNotes ?? "",
    specialRequests: b.specialRequests ?? "",
    createdAt:       b.createdAt.toISOString(),
    paidAt:          b.paidAt?.toISOString() ?? null,
  }));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Bookings</h1>
          <p className="text-sm text-[#7A746D] mt-0.5">
            {total.toLocaleString()} booking{total !== 1 ? "s" : ""}
            {" · "}
            {formatPrice(Number(stats._sum.totalAmount ?? 0), COMPANY_CURRENCY, COMPANY_LOCALE)} collected
          </p>
        </div>
      </div>

      <BookingsTable
        bookings={serialized}
        total={total}
        page={page}
        totalPages={totalPages}
        query={query}
        status={status}
        payment={payment}
        currency={COMPANY_CURRENCY}
        locale={COMPANY_LOCALE}
      />
    </div>
  );
}
