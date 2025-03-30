import PaymentForm from "@/components/common/payment-form";
import { makePayment } from "@/actions/makePayment";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function ClientPaymentPage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies(); 

  const supabase = createSupabaseServerClient({
    getCookie: (name) => cookieStore.get(name)?.value,
    setCookie: (name, value, options) => {
      cookieStore.set(name, value, options);
    },
    deleteCookie: (name, options) => {
      cookieStore.set(name, "", { ...options, maxAge: 0 });
    },
  });

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    if (!user) return <div className="p-4 text-red-500">Please log in</div>;

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Make Payment for Contract {params.id}</h1>
        <PaymentForm
          onSubmit={async (data) => {
            await makePayment({
              contractId: params.id,
              userId: user.id,
              amount: data.amount,
            });
          }}
        />
      </div>
    );
  } catch (err) {
    return (
      <div className="p-4 text-red-500">
        Error loading payment page: {err instanceof Error ? err.message : "Unknown error"}
      </div>
    );
  }
}
